import { useEffect, useCallback, useMemo } from 'react';

import { EntityId } from '@eventespresso/data';
import { useRelations } from '@eventespresso/services';
import { useAssignmentManager, useValidation } from './';
import { AssignmentStatus, BaseProps, DataStateManager } from '../types';

const useDataStateManager = (props: BaseProps): DataStateManager => {
	const assignmentManager = useAssignmentManager();
	// The existing relations to be used to create initial data
	// and to calculate difference between new and old data
	const relations = useRelations();
	const orphanEntities = useValidation(assignmentManager);

	const { initialize, isInitialized } = assignmentManager;
	const initialized = isInitialized();

	useEffect(() => {
		if (!initialized) {
			// initialize with existing data
			initialize({ data: relations.getData(), ...props });
		}
	}, [initialize, initialized, props, relations]);

	const hasNoAssignedDates = useCallback(({ ticketId }) => orphanEntities.tickets.includes(ticketId), [
		orphanEntities.tickets,
	]);

	const hasNoAssignedTickets = useCallback(({ datetimeId }) => orphanEntities.datetimes.includes(datetimeId), [
		orphanEntities.datetimes,
	]);

	const hasOrphanEntitiesOfType = useCallback(
		(entityType: keyof typeof orphanEntities) => {
			if (
				// if TAM is for a date, lets not worry about tickets and vice versa
				(entityType === 'tickets' && props.assignmentType === 'forDate') ||
				(entityType === 'datetimes' && props.assignmentType === 'forTicket')
			) {
				return false;
			}
			// if TAM is for a particular date/ticket, we should worry only about that particular date/ticket
			if (props.assignmentType !== 'forAll') {
				return orphanEntities[entityType]?.includes(props.entity?.id);
			}
			return orphanEntities[entityType]?.length > 0;
		},
		[orphanEntities, props.assignmentType, props.entity?.id]
	);

	const hasOrphanTickets = useCallback(() => hasOrphanEntitiesOfType('tickets'), [hasOrphanEntitiesOfType]);

	const hasOrphanDates = useCallback(() => hasOrphanEntitiesOfType('datetimes'), [hasOrphanEntitiesOfType]);

	const hasOrphanEntities = useCallback(() => hasOrphanTickets() || hasOrphanDates(), [
		hasOrphanDates,
		hasOrphanTickets,
	]);

	const getOldRelation = useCallback(
		({ datetimeId }): EntityId[] => {
			return relations.getRelations({
				entity: 'datetimes',
				entityId: datetimeId,
				relation: 'tickets',
			});
		},
		[relations]
	);

	const getAssignmentStatus = useCallback(
		({ datetimeId, ticketId }): AssignmentStatus => {
			const oldRelatedTickets = getOldRelation({ datetimeId });
			const newRelatedTickets = assignmentManager.getAssignedTickets({ datetimeId });

			const isInOld = oldRelatedTickets.includes(ticketId);
			const isInNew = newRelatedTickets.includes(ticketId);

			switch (true) {
				case isInOld && isInNew:
					return 'OLD';
				case !isInOld && isInNew:
					return 'NEW';
				case isInOld && !isInNew:
					return 'REMOVED';
				case !isInOld && !isInNew:
					return null;
			}
		},
		[assignmentManager, getOldRelation]
	);

	return useMemo(
		() => ({
			...assignmentManager,
			getAssignmentStatus,
			hasNoAssignedDates,
			hasNoAssignedTickets,
			hasOrphanDates,
			hasOrphanEntities,
			hasOrphanTickets,
		}),
		[
			assignmentManager,
			getAssignmentStatus,
			hasNoAssignedDates,
			hasNoAssignedTickets,
			hasOrphanDates,
			hasOrphanEntities,
			hasOrphanTickets,
		]
	);
};

export default useDataStateManager;
