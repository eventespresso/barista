import { useCallback, useMemo } from 'react';

import { Button } from '@eventespresso/adapters';
import { sprintf } from '@eventespresso/i18n';
import { useDataState } from '../../data';
import getRelationIcon from './getRelationIcon';
import type { RenderCellProps, AssignmentStatus } from '../../types';
import type { Datetime, Ticket } from '@eventespresso/edtr-services';

const BodyCell: React.FC<RenderCellProps> = ({ datetime, ticket }) => {
	const { getAssignmentStatus, toggleAssignment } = useDataState();

	const status = getAssignmentStatus({ datetimeId: datetime.id, ticketId: ticket.id });

	const onClick = useCallback(
		() => toggleAssignment({ datetimeId: datetime.id, ticketId: ticket.id }),
		[datetime.id, ticket.id, toggleAssignment]
	);

	const icon = useMemo(() => getRelationIcon(status), [status]);

	const nameOrId = (entity: Datetime | Ticket): string => {
		if (entity.name && entity.name.length > 0) {
			return entity.name;
		}
		if (entity.dbId === 0) {
			return '';
		}
		return entity.dbId.toString();
	};

	const makeLabel = useCallback((entity: Datetime | Ticket, type: string): string => {
		const token = nameOrId(entity);
		if (entity.dbId === 0) {
			return sprintf('new %1$s %2$s', type, token).trim();
		}
		return sprintf('existing %1$s %2$s', type, token);
	}, []);

	// button label should show *opposite* of what current status is
	// e.g. if current status is "OLD", pressing (toggling) button in
	// TAM would change the status to "REMOVED" so aria-label should
	// be indicative button's actions, not current status per say
	const inverseStatus = (status: AssignmentStatus): AssignmentStatus => {
		switch (status) {
			case null:
				return 'NEW';
			case 'NEW':
				return null;
			case 'OLD':
				return 'REMOVED';
			case 'REMOVED':
				return 'OLD';
		}
	};

	const ariaLabel: string = useMemo(() => {
		const ticketLabel = makeLabel(ticket, 'ticket');
		const datetimeLabel = makeLabel(datetime, 'datetime');
		switch (inverseStatus(status)) {
			case null:
				return sprintf('keep %1$s unassigned to %2$s', ticketLabel, datetimeLabel);
			case 'NEW':
				return sprintf('assign %1$s to %2$s', ticketLabel, datetimeLabel);
			case 'OLD':
				return sprintf('keep %1$s assigned to %2$s', ticketLabel, datetimeLabel);
			case 'REMOVED':
				return sprintf('unassign %1$s from %2$s', ticketLabel, datetimeLabel);
		}
	}, [ticket, datetime, status, makeLabel]);

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
