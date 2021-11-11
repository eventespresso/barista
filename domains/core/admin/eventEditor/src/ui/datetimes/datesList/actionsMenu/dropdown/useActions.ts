import { useCallback, useMemo } from 'react';
import * as R from 'ramda';

import { isTrashed } from '@eventespresso/predicates';
import { useDatetimeItem, useDatetimeMutator, useDeleteRelatedTickets, useEventId } from '@eventespresso/edtr-services';
import { useRelations } from '@eventespresso/services';
import type { EntityId } from '@eventespresso/data';

type Actions = {
	copyDate: VoidFunction;
	trashDate: VoidFunction;
	isTrashed: boolean;
};

const useActions = (datetimeId: EntityId): Actions => {
	// Make sure to subscribe to Apollo cache
	// to avoid stale data
	const datetime = useDatetimeItem({ id: datetimeId });

	const eventId = useEventId();

	const { createEntity, deleteEntity } = useDatetimeMutator(datetimeId);

	const { getRelations } = useRelations();

	const tickets = getRelations({
		entity: 'datetimes',
		entityId: datetimeId,
		relation: 'tickets',
	});

	const copyDate = useCallback(() => {
		const newDatetime = R.pick(
			['capacity', 'description', 'endDate', 'isPrimary', 'name', 'order', 'startDate'],
			datetime
		);
		return createEntity({ ...newDatetime, eventId, tickets });
	}, [createEntity, datetime, eventId, tickets]);

	const trashed = isTrashed(datetime);

	const deleteRelatedTickets = useDeleteRelatedTickets();

	const trashDate = useCallback(async () => {
		await deleteEntity({ id: datetimeId, deletePermanently: trashed });
		await deleteRelatedTickets(datetimeId, trashed);
	}, [deleteEntity, deleteRelatedTickets, datetimeId, trashed]);

	return useMemo(
		() => ({
			copyDate,
			trashDate,
			isTrashed: trashed,
		}),
		[copyDate, trashDate, trashed]
	);
};

export default useActions;
