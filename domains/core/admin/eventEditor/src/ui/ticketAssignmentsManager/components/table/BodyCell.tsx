import { useCallback, useMemo } from 'react';

import { Button } from '@eventespresso/adapters';
import { sprintf } from '@eventespresso/i18n';
import { useDataState } from '../../data';
import getRelationIcon from './getRelationIcon';
import type { RenderCellProps } from '../../types';

const BodyCell: React.FC<RenderCellProps> = ({ datetime, ticket }) => {
	const { getAssignmentStatus, toggleAssignment } = useDataState();

	const status = getAssignmentStatus({ datetimeId: datetime.id, ticketId: ticket.id });

	const onClick = useCallback(
		() => toggleAssignment({ datetimeId: datetime.id, ticketId: ticket.id }),
		[datetime.id, ticket.id, toggleAssignment]
	);

	const icon = useMemo(() => getRelationIcon(status), [status]);

	const ticketName: string = useMemo(() => {
		if (!ticket.name) {
			return ticket.dbId.toString();
		}
		return ticket.name;
	}, [ticket]);

	const datetimeName: string = useMemo(() => {
		if (!datetime.name) {
			return datetime.dbId.toString();
		}
		return datetime.name;
	}, [datetime]);

	const ariaLabel: string = useMemo(() => {
		// since clicking on button invokes opposite action, we show the label describing what will happen when the button is clicked, e.g. when ticket is already assigned, clicking button will unassign ticket
		switch (status) {
			case 'NEW':
			case 'OLD':
				return sprintf('unassign ticket %1$s to datetime %2$s', ticketName, datetimeName);
			case 'REMOVED':
				return sprintf('keep ticket %1$s to datetime %2$s', ticketName, datetimeName);
			case null:
			default:
				return sprintf('assign ticket %1$s to datetime %2$s', ticketName, datetimeName);
		}
	}, [status, ticketName, datetimeName]);

	return (
		<Button
			aria-label={ariaLabel}
			className='ee-tam-relation-btn'
			icon={icon}
			margin='auto'
			onClick={onClick}
			variant='link'
		/>
	);
};

export default BodyCell;
