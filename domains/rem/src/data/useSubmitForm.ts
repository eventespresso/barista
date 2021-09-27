import { useCallback, useEffect, useMemo } from 'react';

import { copyDatetimeFields, isDatetimeInputField, getHighestOrder } from '@eventespresso/predicates';
import { useDatetimeMutator, useDatetimes, useCappedQuantity } from '@eventespresso/edtr-services';
import { useSiteDateToUtcISO } from '@eventespresso/services';
import { setTimeFromDate } from '@eventespresso/dates';
import { useProgress } from '@eventespresso/hooks';
import { isInfinite, parseInfinity } from '@eventespresso/utils';
import { useSystemNotifications } from '@eventespresso/toaster';
import { __ } from '@eventespresso/i18n';

import { getSharedTickets, getNonSharedTickets, computeDatetimeEndDate } from '../utils';
import type { GeneratedDate } from '../ui/generatedDates';
import useSaveRecurrence from './useSaveRecurrence';
import useMutateTickets from './useMutateTickets';
import type { FormState } from './types';
import useOnUpdateRecurrence from '../services/apollo/mutations/recurrences/useOnUpdateRecurrence';

const initialProgress = { datetimes: 0, tickets: 0 };

const useSubmitForm = (formState: FormState, generatedDates: Array<GeneratedDate>): (() => Promise<void>) => {
	const { dateDetails, tickets } = formState;
	const { createEntity: createDatetime } = useDatetimeMutator();
	const toUtcISO = useSiteDateToUtcISO();
	const dates = useDatetimes();
	const onUpdateRecurrence = useOnUpdateRecurrence();

	const allTickets = Object.values(tickets);
	const sharedTickets = getSharedTickets(allTickets);
	const nonSharedTickets = getNonSharedTickets(allTickets);

	const totalItems = useMemo(() => {
		const sharedTicketsCount = sharedTickets.length;
		const nonSharedTicketsCount = nonSharedTickets.length;
		const generatedDatesCount = generatedDates.length;

		return sharedTicketsCount + nonSharedTicketsCount * generatedDatesCount + generatedDatesCount;
	}, [generatedDates.length, nonSharedTickets.length, sharedTickets.length]);

	const { incrementProgress, totalProgress, updateProgress } = useProgress(totalItems, initialProgress);

	const mutateTickets = useMutateTickets({ incrementProgress: incrementProgress('tickets') });
	const saveRecurrence = useSaveRecurrence();
	const getCappedQuantity = useCappedQuantity();
	const toaster = useSystemNotifications();

	useEffect(() => {
		totalProgress && console.log('totalProgress', `${totalProgress}%`);
	}, [totalProgress]);

	return useCallback(async () => {
		const recurrence = await saveRecurrence(formState);

		// prepare common date mutation input
		const normalizedDateInput = copyDatetimeFields(dateDetails, isDatetimeInputField);

		let showNotice = false;

		const updatedSharedTickets = sharedTickets.map((ticket) => {
			let quantity = parseInfinity(ticket.quantity);
			// if the date capacity is not infinite, we may need to restrict the ticket quantity.
			if (!isInfinite(normalizedDateInput.capacity)) {
				quantity = getCappedQuantity({ quantity, capacity: normalizedDateInput.capacity });
				// if the quantity has been adjusted
				if (!showNotice && quantity !== parseInfinity(ticket.quantity)) {
					showNotice = true;
				}
			}
			return { ...ticket, quantity };
		});

		// create shared tickets and collect their ids
		const sharedTicketIds = await mutateTickets(updatedSharedTickets, true);

		const { duration, unit, startTime } = dateDetails;

		const highestDateOrder = getHighestOrder(dates);

		const setStartTime = setTimeFromDate(startTime);

		// Dates can be mutated in parallel
		const datetimeIds = await Promise.all(
			generatedDates.map(async ({ date }, index) => {
				const start = setStartTime(date);
				const end = computeDatetimeEndDate(start, unit, duration);

				const updatedNonSharedTickets = nonSharedTickets.map((ticket) => {
					let quantity = parseInfinity(ticket.quantity);
					// if the date capacity is not infinite, we may need to restrict the ticket quantity.
					if (!isInfinite(normalizedDateInput.capacity)) {
						quantity = getCappedQuantity({ quantity, capacity: normalizedDateInput.capacity });
						// if the quantity has been adjusted
						if (!showNotice && quantity !== parseInfinity(ticket.quantity)) {
							showNotice = true;
						}
					}
					return { ...ticket, quantity };
				});

				// create tickets for the date and get the related ids
				const relatedTicketIds = await mutateTickets(updatedNonSharedTickets, false, {
					startDate: start,
					endDate: end,
				});
				const tickets = [...sharedTicketIds, ...relatedTicketIds];

				// compute and convert start and end date to UTC
				const startDate = toUtcISO(start);
				const endDate = toUtcISO(end);

				// order will be the highest order among dates plus its position (index +1) in the list
				const order = highestDateOrder + index + 1;

				const input = { ...normalizedDateInput, order, startDate, endDate, tickets, recurrence: recurrence.id };

				const result = await createDatetime(input);
				const datetimeId = result?.data?.createEspressoDatetime?.espressoDatetime?.id;

				updateProgress('datetimes');

				return datetimeId;
			})
		);

		if (showNotice) {
			toaster.info({
				message: __(
					'Ticket quantity has been adjusted because it cannot be more than the related event date capacity.'
				),
			});
		}

		onUpdateRecurrence({ recurrence, datetimeIds });
	}, [
		createDatetime,
		dateDetails,
		dates,
		formState,
		generatedDates,
		getCappedQuantity,
		mutateTickets,
		nonSharedTickets,
		onUpdateRecurrence,
		saveRecurrence,
		sharedTickets,
		toUtcISO,
		toaster,
		updateProgress,
	]);
};

export default useSubmitForm;
