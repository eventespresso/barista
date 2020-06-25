import React from 'react';

import { Button } from '@eventespresso/adapters';
import type { RenderCellProps } from '../../types';
import { useDataState } from '../../data';
import useCellIcon from './useCellIcon';

const BodyCell: React.FC<RenderCellProps> = ({ datetime, ticket }) => {
	const { toggleAssignment } = useDataState();

	const getCellIcon = useCellIcon();

	const onClick = () => toggleAssignment({ datetimeId: datetime.id, ticketId: ticket.id });

	const icon = getCellIcon({ datetimeId: datetime.id, ticketId: ticket.id });

	return <Button icon={icon} margin='auto' onClick={onClick} variant='link' />;
};

export default BodyCell;
