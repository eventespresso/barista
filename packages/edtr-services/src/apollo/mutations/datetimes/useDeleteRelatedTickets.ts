import { useCallback } from 'react';

import { useRelations } from '@eventespresso/services';
import type { EntityId } from '@eventespresso/constants'

import { useBulkDeleteTickets } from '../tickets';

type Callback = (datetimeId: EntityId, deletePermanently?: boolean) => Promise<void>;

/**
 * Returns a callback to delete or trash the related tickets for a given date
 * if the ticket only related to the date
 */
const useDeleteRelatedTickets = (): Callback => {
	const { getRelations } = useRelations();

	const deleteTickets = useBulkDeleteTickets();

	return useCallback(
		async (datetimeId, deletePermanently) => {
			const relatedTicketIds = getRelations({
				entity: 'datetimes',
				entityId: datetimeId,
				relation: 'tickets',
			});

			const ticketIdsRelatedOnlyToTheDate = relatedTicketIds.filter((ticketId) => {
				const relatedDatetimeIds = getRelations({
					entity: 'tickets',
					entityId: ticketId,
					relation: 'datetimes',
				});

				return relatedDatetimeIds.length === 1;
			});

			// if we have something to work with
			if (ticketIdsRelatedOnlyToTheDate.length) {
				await deleteTickets({
					entityIds: ticketIdsRelatedOnlyToTheDate,
					deletePermanently,
					deleteRemotely: false,
					relatedDatetimeIds: [datetimeId],
				});
			}
		},
		[deleteTickets, getRelations]
	);
};

export default useDeleteRelatedTickets;
