import { useCallback, useEffect, useMemo } from 'react';
import { parseISO } from 'date-fns';

import { useProgress } from '@eventespresso/hooks';
import { useLazyDatetime, useDatetimes, useCappedQuantity } from '@eventespresso/edtr-services';
import type { EntityId } from '@eventespresso/data';
import { minDateCapacity } from '@eventespresso/predicates';
import { isInfinite, parseInfinity } from '@eventespresso/utils';
import { useSystemNotifications } from '@eventespresso/toaster';
import { __ } from '@eventespresso/i18n';

import { getSharedTickets, getNonSharedTickets } from '../../utils';
import useMutateTickets from '../../data/useMutateTickets';
import type { FormState } from '../../data';

const initialProgress = { datetimes: 0, tickets: 0 };

const useSubmitForm = (tickets: FormState['tickets'], datetimeIds: Array<EntityId>): (() => Promise<void>) => {
	const allTickets = Object.values(tickets);
	const sharedTickets = getSharedTickets(allTickets);
	const nonSharedTickets = getNonSharedTickets(allTickets);

	const totalItems = useMemo(() => {
		const sharedTicketsCount = sharedTickets.length;
		const nonSharedTicketsCount = nonSharedTickets.length;

		return sharedTicketsCount + datetimeIds.length * nonSharedTicketsCount;
	}, [datetimeIds.length, nonSharedTickets.length, sharedTickets.length]);

	const { incrementProgress, totalProgress, updateProgress } = useProgress(totalItems, initialProgress);

	const mutateTickets = useMutateTickets({ incrementProgress: incrementProgress('tickets') });
	const getDatetime = useLazyDatetime();

	const allDates = useDatetimes();
	const toaster = useSystemNotifications();
	const getCappedQuantity = useCappedQuantity();

	useEffect(() => {
		totalProgress && console.log('totalProgress', `${totalProgress}%`);
	}, [totalProgress]);

	return useCallback(async () => {
		const minimumCapacity = minDateCapacity(allDates)(datetimeIds);

		let showNotice = false;

		const updatedSharedTickets = sharedTickets.map((ticket) => {
			let quantity = parseInfinity(ticket.quantity);
			// if the date capacity is not infinite, we may need to restrict the ticket quantity.
			if (!isInfinite(minimumCapacity)) {
				quantity = getCappedQuantity({ quantity, relatedDateIds: datetimeIds });
				// if the quantity has been adjusted
				if (!showNotice && quantity !== parseInfinity(ticket.quantity)) {
					showNotice = true;
				}
			}
			// add datetimes and quantity to each ticket
			return { ...ticket, datetimes: datetimeIds, quantity };
		});

		// create shared tickets
		await mutateTickets(updatedSharedTickets, true);

		// Dates can be mutated in parallel
		await Promise.all(
			datetimeIds.map(async (datetimeId) => {
				const datetime = getDatetime(datetimeId);
				const startDate = parseISO(datetime?.startDate);
				const endDate = parseISO(datetime?.endDate);

				const updatedNonSharedTickets = nonSharedTickets.map((ticket) => {
					let quantity = parseInfinity(ticket.quantity);
					// if the date capacity is not infinite, we may need to restrict the ticket quantity.
					if (!isInfinite(datetime.capacity)) {
						quantity = getCappedQuantity({ quantity, relatedDateIds: [datetimeId] });
						// if the quantity has been adjusted
						if (!showNotice && quantity !== parseInfinity(ticket.quantity)) {
							showNotice = true;
						}
					}
					return { ...ticket, quantity, datetimes: [datetimeId] };
				});

				await mutateTickets(updatedNonSharedTickets, false, {
					startDate,
					endDate,
				});

				updateProgress('datetimes');
			})
		);

		if (showNotice) {
			toaster.info({
				message: __(
					'Ticket quantity has been adjusted because it cannot be more than the related event date capacity.'
				),
			});
		}
	}, [
		allDates,
		datetimeIds,
		getCappedQuantity,
		getDatetime,
		mutateTickets,
		nonSharedTickets,
		sharedTickets,
		toaster,
		updateProgress,
	]);
};

export default useSubmitForm;
