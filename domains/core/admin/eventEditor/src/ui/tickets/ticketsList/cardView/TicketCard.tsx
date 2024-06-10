import { useMemo } from 'react';
import { __, sprintf } from '@eventespresso/i18n';
import { EntityActionsMenuLayout } from '@eventespresso/ui-components';
import { EntityCard, EntityPaperFrame } from '@eventespresso/ui-components';
import { getTicketStatusBgColorClassName } from '@eventespresso/helpers';
import { modifyTicketStatusBasedOnDatetimes, useTicketItem } from '@eventespresso/edtr-services';

import Details from './Details';
import TicketCardSidebar from './TicketCardSidebar';
import TicketActionsMenu from '../actionsMenu/TicketActionsMenu';
import type { TicketItemProps } from '../types';

const TicketCard: React.FC<TicketItemProps> = ({ id }) => {
	const origTicket = useTicketItem({ id });
	const ticket = modifyTicketStatusBasedOnDatetimes(origTicket);

	const bgClassName = getTicketStatusBgColorClassName(ticket);
	const notice =
		origTicket.status !== ticket.status ? (
			<span className='ee-status--error'>
				{sprintf(
					/* translators: %s ticket status like: ON_SALE, PENDING, TRASHED, SOLD OUT */
					__(`Ticket status is now %s due to a related datetime status change`),
					ticket.status
				)}
			</span>
		) : undefined;

	const ariaLabel: string = useMemo(() => {
		// since title is optional property in datetime,
		// we need to consider that and provide a sane default value if title is missing
		return ticket.name.length > 0 ? ticket.name : 'ticket';
	}, [ticket]);

	const {
		AriaLabel: { Provider: AriaLabel },
	} = EntityPaperFrame['Contexts'];

	return ticket ? (
		<AriaLabel value={ariaLabel}>
			<EntityCard
				actionsMenu={<TicketActionsMenu entity={ticket} layout={EntityActionsMenuLayout.Vertical} />}
				details={<Details entity={ticket} />}
				entity={ticket}
				notice={notice}
				reverse
				sidebar={<TicketCardSidebar entity={ticket} />}
				sidebarClass={bgClassName}
			/>
		</AriaLabel>
	) : null;
};

export default TicketCard;
