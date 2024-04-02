import { EntityActionsMenu } from '@eventespresso/ui-components';
import type { ActionsMenuComponentProps } from '@eventespresso/registry';
import type { Ticket } from '@eventespresso/constants';

import useTicketsActionMenuItems from '../../hooks/useTicketsActionMenuItems';

const TicketActionsMenu: React.FC<ActionsMenuComponentProps<Ticket>> = ({ entity, ...props }) => {
	const menuItems = useTicketsActionMenuItems(entity);

	return <EntityActionsMenu {...props} menuItems={menuItems} />;
};

export default TicketActionsMenu;
