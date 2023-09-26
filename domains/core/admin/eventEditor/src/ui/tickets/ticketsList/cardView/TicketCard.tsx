import { useMemo } from 'react';
import { EntityActionsMenuLayout } from '@eventespresso/ui-components';
import { EntityCard, EntityPaperFrame } from '@eventespresso/ui-components';
import { ticketStatusBgColorClassName } from '@eventespresso/helpers';
import { useTicketItem } from '@eventespresso/edtr-services';

import Details from './Details';
import TicketCardSidebar from './TicketCardSidebar';
import TicketActionsMenu from '../actionsMenu/TicketActionsMenu';
import type { TicketItemProps } from '../types';

const TicketCard: React.FC<TicketItemProps> = ({ id }) => {
	const ticket = useTicketItem({ id });
	const bgClassName = ticketStatusBgColorClassName(ticket);

	const ariaLabel: string = useMemo(() => {
		// since title is optional property in datetime, we need to consider that and provide a sane default value if title is missing
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
				reverse
				sidebar={<TicketCardSidebar entity={ticket} />}
				sidebarClass={bgClassName}
			/>
		</AriaLabel>
	) : null;
};

export default TicketCard;
