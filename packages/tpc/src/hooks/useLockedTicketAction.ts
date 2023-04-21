import { useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { useConfirmationDialog } from '@eventespresso/ui-components';
import { EdtrGlobalModals, Ticket, useTicketMutator } from '@eventespresso/edtr-services';
import { useGlobalModal } from '@eventespresso/registry';

import { SOLD_TICKET_ERROR_MESSAGE } from '../utils';
import useCopyTicket from './useCopyTicket';
import type { BaseProps } from '../types';

type LockedTicketAction = {
	alertContainer: React.ReactNode;
	showAlert: VoidFunction;
};

type Action = 'COPY' | 'COPY/TRASH' | 'COPY/TRASH/SHOW_TPC';

const getConfirmButtonText = (action: Action): string => {
	switch (action) {
		case 'COPY':
			return __('Copy ticket');

		case 'COPY/TRASH':
		case 'COPY/TRASH/SHOW_TPC':
			return __('Copy and archive this ticket');

		default:
			return __('OK');
	}
};

/**
 *
 * @param ticket {Ticket}
 * @param action {Action} The action to take on confirmation.
 *
 * The actions may depend upon the situation. For example,
 * - When a user tries to delete a locked ticket, we just show them an alert, but take no action
 * - When they try to edit the price inline, we show the alert with COPY/TRASH actions
 * - When they try to open TPC, we show the alert with COPY/TRASH/SHOW_TPC action
 */
const useLockedTicketAction = (ticket: Ticket, action?: Action): LockedTicketAction => {
	const copyTicket = useCopyTicket(ticket);
	const { deleteEntity: deleteTicket } = useTicketMutator();
	const { openWithData } = useGlobalModal<BaseProps>(EdtrGlobalModals.TPC);

	const onConfirm = useCallback(async () => {
		let copiedTicketId = '';
		switch (action) {
			case 'COPY':
				await copyTicket();
				break;

			case 'COPY/TRASH':
				await copyTicket();
				await deleteTicket({ id: ticket.id });
				break;

			case 'COPY/TRASH/SHOW_TPC':
				copiedTicketId = await copyTicket();
				await deleteTicket({ id: ticket.id });
				// show TPC for the copied ticket
				if (copiedTicketId) {
					openWithData({ ticketId: copiedTicketId });
				}
				break;
		}
	}, [action, copyTicket, deleteTicket, openWithData, ticket.id]);

	const yesButtonText = getConfirmButtonText(action);
	const { confirmationDialog, onOpen } = useConfirmationDialog({
		message: SOLD_TICKET_ERROR_MESSAGE,
		title: __('Price editing is disabled!'),
		onConfirm,
		noButtonText: __('Cancel'),
		yesButtonText,
	});

	return useMemo(
		() => ({
			alertContainer: confirmationDialog,
			showAlert: onOpen,
		}),
		[confirmationDialog, onOpen]
	);
};

export default useLockedTicketAction;
