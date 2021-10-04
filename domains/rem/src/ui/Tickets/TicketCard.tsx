import { useCallback } from 'react';

import { __, sprintf } from '@eventespresso/i18n';
import { SimpleTicketCard } from '@eventespresso/ee-components';
import { SimpleEntityRendererProps } from '@eventespresso/ui-components';
import { LOCALIZED_DATE_AND_TIME_SHORT_FORMAT } from '@eventespresso/constants';
import { useTimeZoneTime } from '@eventespresso/services';
import { DATE_INTERVALS } from '@eventespresso/dates';

import { RemTicket, useFormState } from '../../data';

const TicketCard: React.FC<SimpleEntityRendererProps<RemTicket>> = ({ entity: ticket, onEdit, onDelete }) => {
	const { tickets } = useFormState();
	const { formatForSite } = useTimeZoneTime();

	const { ticketSalesStart, ticketSalesEnd } = tickets?.[ticket.id];

	const renderStartDate = useCallback(
		(ticket) => {
			const { isShared, ticketSalesDates, ticketSalesStart } = ticket;

			return isShared
				? formatForSite(ticketSalesDates.startDate as Date, LOCALIZED_DATE_AND_TIME_SHORT_FORMAT)
				: sprintf(
						/* translators:
						1. interval value, like 10 in "10 days", 15 in "15 minutes"
						2. the interval e.g. "days", "weeks"
						3. position (before/after) with respect to start or end date
						4. the date ("start" or "end") for which the position is specified
						The final string may look like this:
						"3 days before the start date"
						*/
						// eslint-disable-next-line @wordpress/i18n-translator-comments
						__('%1$d %2$s %3$s the %4$s date'),
						ticketSalesStart?.unitValue,
						DATE_INTERVALS?.[ticketSalesStart?.unit],
						ticketSalesStart?.position === 'before' ? __('before') : __('after'),
						ticketSalesStart?.startOrEnd === 'start' ? __('start') : __('end')
				  );
		},
		[formatForSite]
	);

	const renderEndDate = useCallback(
		(ticket) => {
			const { isShared, ticketSalesDates, ticketSalesEnd } = ticket;

			return isShared
				? formatForSite(ticketSalesDates.endDate as Date, LOCALIZED_DATE_AND_TIME_SHORT_FORMAT)
				: sprintf(
						/* translators:
						1. interval value, like 10 in "10 days", 15 in "15 minutes"
						2. the interval e.g. "days", "weeks"
						3. position (before/after) with respect to start or end date
						4. the date ("start" or "end") for which the position is specified
						The final string may look like this:
						"3 days before the start date"
						*/
						// eslint-disable-next-line @wordpress/i18n-translator-comments
						__('%1$d %2$s %3$s the %4$s date'),
						ticketSalesEnd?.unitValue,
						DATE_INTERVALS?.[ticketSalesEnd?.unit],
						ticketSalesEnd?.position === 'before' ? __('before') : __('after'),
						ticketSalesEnd?.startOrEnd === 'start' ? __('start') : __('end')
				  );
		},
		[formatForSite]
	);

	const showAfterDetails = Boolean(ticketSalesStart && ticketSalesEnd);

	return (
		<SimpleTicketCard
			entity={ticket as any}
			onDelete={onDelete}
			onEdit={onEdit}
			renderEndDate={renderEndDate}
			renderStartDate={renderStartDate}
			showAfterDetails={showAfterDetails}
		/>
	);
};

export default TicketCard;
