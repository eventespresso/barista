import { __, sprintf } from '@eventespresso/i18n';

import { CurrencyDisplay } from '@eventespresso/ee-components';
import { SimpleEntityCard } from '@eventespresso/ui-components';
import { LOCALIZED_DATE_AND_TIME_SHORT_FORMAT } from '@eventespresso/constants';
import { useTimeZoneTime } from '@eventespresso/services';
import { DATE_INTERVALS } from '@eventespresso/dates';

import Sidebar from './Sidebar';
import { useFormState } from '../../../data';
import { TicketCardProps } from './types';

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onEdit }) => {
	const { tickets } = useFormState();
	const { formatForSite } = useTimeZoneTime();

	const { isShared, ticketSalesDates, ticketSalesStart, ticketSalesEnd } = tickets?.[ticket.id];

	const beforeDetails = <CurrencyDisplay value={ticket.price} vertical />;

	const afterDetails = ticketSalesStart && ticketSalesEnd && (
		<div className='ee-ticket-offset'>
			<div className={'ee-ticket-offset__label'}>{__('starts')}</div>
			<div className={'ee-ticket-offset__date'}>
				{isShared && formatForSite(ticketSalesDates.startDate as Date, LOCALIZED_DATE_AND_TIME_SHORT_FORMAT)}
				{!isShared &&
					sprintf(
						/* translators:
					1. interval value, like 10 in "10 days", 15 in "15 minutes"
					2. the interval e.g. "days", "weeks"
					3. position (before/after) with respect to start or end date
					4. the date ("start" or "end") for which the position is sepcified
					The final string may look like this:
					"3 days before the start date"
					*/
						// eslint-disable-next-line @wordpress/i18n-translator-comments
						__('%1$d %2$s %3$s the %4$s date'),
						ticketSalesStart?.unitValue,
						DATE_INTERVALS?.[ticketSalesStart?.unit],
						ticketSalesStart?.position === 'before' ? __('before') : __('after'),
						ticketSalesStart?.startOrEnd === 'start' ? __('start') : __('end')
					)}
			</div>
			<div className={'ee-ticket-offset__label'}>{__('ends')}</div>
			<div className={'ee-ticket-offset__date'}>
				{isShared && formatForSite(ticketSalesDates.startDate as Date, LOCALIZED_DATE_AND_TIME_SHORT_FORMAT)}
				{!isShared &&
					sprintf(
						/* translators:
					1. interval value, like 10 in "10 days", 15 in "15 minutes"
					2. the interval e.g. "days", "weeks"
					3. position (before/after) with respect to start or end date
					4. the date ("start" or "end") for which the position is sepcified
					The final string may look like this:
					"3 days before the end date"
					*/
						// eslint-disable-next-line @wordpress/i18n-translator-comments
						__('%1$d %2$s %3$s the %4$s date'),
						ticketSalesEnd?.unitValue,
						DATE_INTERVALS?.[ticketSalesEnd?.unit],
						ticketSalesEnd?.position === 'before' ? __('before') : __('after'),
						ticketSalesEnd?.startOrEnd === 'start' ? __('start') : __('end')
					)}
			</div>
		</div>
	);

	const sidebar = <Sidebar onEdit={onEdit} ticket={ticket} />;

	return (
		<SimpleEntityCard
			afterDetails={afterDetails}
			beforeDetails={beforeDetails}
			id={ticket.id}
			name={ticket.name}
			sidebar={sidebar}
		/>
	);
};

export default TicketCard;
