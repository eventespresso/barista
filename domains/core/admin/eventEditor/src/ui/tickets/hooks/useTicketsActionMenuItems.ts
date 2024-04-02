import type { Ticket } from '@eventespresso/constants';
import { useEntityActionsMenuItems } from '@edtrHooks/index';

const useTicketsActionMenuItems = (ticket: Ticket): Array<React.ReactNode> => {
	return useEntityActionsMenuItems('ticket', ticket);
};

export default useTicketsActionMenuItems;
