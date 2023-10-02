import { useCallback, useMemo } from 'react';

import { Button } from '@eventespresso/ui-components';
import { sprintf } from '@eventespresso/i18n';
import { useDataState } from '../../data';
import getRelationIcon from './getRelationIcon';
import type { RenderCellProps } from '../../types';
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

	const entityLabel = useCallback((entity: Datetime | Ticket, type: string): string => {
		const token = nameOrId(entity);
		return sprintf('%1$s %2$s', type, token);
	}, []);

	const ariaLabel: string = useMemo(() => {
		const ticketLabel = entityLabel(ticket, 'ticket');
		const datetimeLabel = entityLabel(datetime, 'datetime');
		switch (status) {
			case null:
				// no current status so assign new relation
				return sprintf('click to assign %1$s to %2$s', ticketLabel, datetimeLabel);
			case 'NEW':
				// remove newly assigned relation
				return sprintf('click to remove new assignment for %1$s from %2$s', ticketLabel, datetimeLabel);
			case 'OLD':
				// remove existing relation
				return sprintf('click to remove %1$s from %2$s', ticketLabel, datetimeLabel);
			case 'REMOVED':
				// reassign newly removed relation
				return sprintf('click to reassign %1$s to %2$s', ticketLabel, datetimeLabel);
		}
	}, [ticket, datetime, status, entityLabel]);

	return (
		<Button
			className='ee-tam-relation-btn'
			icon={icon}
			margin='auto'
			onClick={onClick}
			tooltip={ariaLabel}
			variant='link'
		/>
	);
};

export default BodyCell;
