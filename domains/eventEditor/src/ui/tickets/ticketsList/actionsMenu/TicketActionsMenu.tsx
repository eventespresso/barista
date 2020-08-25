import React from 'react';

import type { ActionsMenuComponentProps } from '@eventespresso/registry';
import { EntityActionsMenu } from '@eventespresso/components';
import { getPropsAreEqual } from '@eventespresso/utils';
import { Ticket } from '@eventespresso/edtr-services';
import useTicketsActionMenuItems from '../../hooks/useTicketsActionMenuItems';

const TicketActionsMenu: React.FC<ActionsMenuComponentProps<Ticket>> = ({ entity, ...props }) => {
	const menuItems = useTicketsActionMenuItems(entity);

	return <EntityActionsMenu {...props} menuItems={menuItems} />;
};

export default React.memo(TicketActionsMenu, getPropsAreEqual(['entity', 'cacheId']));
