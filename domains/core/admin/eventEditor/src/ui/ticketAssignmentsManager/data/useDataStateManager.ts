import { useEffect, useCallback, useMemo, useState } from 'react';
import * as R from 'ramda';

import type { EntityId } from '@eventespresso/constants';
import { useRelations } from '@eventespresso/services';
import { useDefaultTicketIds } from '@eventespresso/edtr-services';

import { useAssignmentManager, useValidation } from './';
import { AssignmentStatus, BaseProps, DataStateManager } from '../types';

const useDataStateManager = (props: BaseProps): DataStateManager => {
	const [initialDataIsValid, setInitialDataIsValid] = useState(false);
	const assignmentManager = useAssignmentManager();
	// The existing relations to be used to create initial data
	// and to calculate difference between new and old data
	const relations = useRelations();
	const orphanEntities = useValidation(assignmentManager);
	const defaultTicketIds = useDefaultTicketIds();

	const { initialize, isInitialized } = assignmentManager;
	const initialized = isInitialized();

	const hasNoAssignedDates = useCallback(
		({ ticketId }) => orphanEntities.tickets.includes(ticketId),
		[orphanEntities.tickets]
	);

	const hasNoAssignedTickets = useCallback(
		({ datetimeId }) => orphanEntities.datetimes.includes(datetimeId),
		[orphanEntities.datetimes]
	);

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

	const hasOrphanEntities = useCallback(
		() => hasOrphanTickets() || hasOrphanDates(),
		[hasOrphanDates, hasOrphanTickets]
	);

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

	useEffect(() => {
		if (!initialized) {
			const data = relations.getData();
			// remove default tickets from TAM relations
			const newData = { ...data, tickets: R.omit(defaultTicketIds, data.tickets || {}) };
			// initialize with existing data
			initialize({ data: newData, ...props });
			// now check if there are any orphaned entities in the initial data and save the result
			const hasOrphans = orphanEntities?.datetimes?.length !== 0 || orphanEntities?.tickets?.length !== 0;
			setInitialDataIsValid(!hasOrphans);
		}
	}, [defaultTicketIds, initialize, initialized, orphanEntities, props, relations, setInitialDataIsValid]);

	return useMemo(
		() => ({
			...assignmentManager,
			getAssignmentStatus,
			hasNoAssignedDates,
			hasNoAssignedTickets,
			hasOrphanDates,
			hasOrphanEntities,
			hasOrphanTickets,
			initialDataIsValid,
		}),
		[
			assignmentManager,
			getAssignmentStatus,
			hasNoAssignedDates,
			hasNoAssignedTickets,
			hasOrphanDates,
			hasOrphanEntities,
			hasOrphanTickets,
			initialDataIsValid,
		]
	);
};

export default useDataStateManager;
