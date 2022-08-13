import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { Ticket, useTicketsListFilterState } from '@eventespresso/edtr-services';
import { Trash as TrashIcon } from '@eventespresso/icons';
import { AlertType, TrashEntity, useConfirmationDialog } from '@eventespresso/ui-components';
import { isTrashed as isTicketTrashed, isLocked } from '@eventespresso/predicates';
import { useLockedTicketAction } from '@eventespresso/tpc';

import useDeleteTicketHandler from '@edtrUI/tickets/hooks/useDeleteTicketHandler';

export interface DeleteTicketProps {
	ticket: Ticket;
}

export const DeleteTicket: React.FC<DeleteTicketProps> = ({ ticket }) => {
	const isTrashed = isTicketTrashed(ticket);

	const title = isTrashed ? __('Permanently Delete Ticket?') : __('Move Ticket to Trash?');

	const message = isTrashed
		? __('Are you sure you want to permanently delete this ticket? This action is permanent and can not be undone.')
		: __(
				`Are you sure you want to move this ticket to the trash? You can "untrash" this ticket later if you need to.`
		  );

	const deleteTicket = useDeleteTicketHandler(ticket.id);

	const onConfirmDelete = useCallback(() => {
		deleteTicket(isTrashed);
	}, [deleteTicket, isTrashed]);

	const { confirmationDialog, onOpen: confirmDelete } = useConfirmationDialog({
		addIconBG: true,
		alertType: AlertType.ACCENT,
		icon: TrashIcon,
		message,
		title,
		onConfirm: onConfirmDelete,
	});

	const { alertContainer, showAlert } = useLockedTicketAction(ticket);

	const isTheOnlyTicket = useTicketsListFilterState().total === 1;

	const cannotBeDeleted = isTrashed && isTheOnlyTicket;

	const deleteTicketTitle = isTrashed ? __('delete permanently') : __('trash ticket');

	const onDelete = isTrashed && isLocked(ticket) ? showAlert : confirmDelete;

	return (
		<>
			<TrashEntity onClick={onDelete} title={deleteTicketTitle} isDisabled={cannotBeDeleted} />
			{confirmationDialog}
			{alertContainer}
		</>
	);
};
