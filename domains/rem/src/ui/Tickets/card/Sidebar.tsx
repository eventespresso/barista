import { useCallback } from 'react';

import { Edit, Trash } from '../actions';
import { TicketCardProps } from './types';
import { useFormState } from '../../../data';

const Sidebar: React.FC<TicketCardProps> = ({ ticket, onEdit }) => {
	const { deleteTicket } = useFormState();

	const onClickEdit = useCallback(() => {
		onEdit(ticket);
	}, [onEdit, ticket]);

	const onClickTrash = useCallback(() => {
		deleteTicket(ticket?.id);
	}, [deleteTicket, ticket]);

	return (
		<div className='ee-ticket-sidebar'>
			<Edit onClick={onClickEdit} />
			<Trash onClick={onClickTrash} />
		</div>
	);
};

export default Sidebar;
