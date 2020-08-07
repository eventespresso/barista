import React, { useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { __ } from '@wordpress/i18n';

import { CalendarOutlined } from '@eventespresso/icons';
import { DateTimeRangePicker } from '@eventespresso/adapters';
import { ButtonSize, ButtonType, IconButton, Popover } from '../../';
import { EditDateButtonProps } from './types';

const EditDateRangeButton: React.FC<EditDateButtonProps> = ({ header, onEditHandler, startDate, endDate, tooltip }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const headerText = header ? header : __('Edit Start and End Dates and Times');
	const onChange = useCallback(
		(dates: string[]) => {
			onEditHandler(dates);
			onClose();
		},
		[onClose, onEditHandler]
	);

	return (
		<Popover
			className={'ee-edit-calendar-date-range'}
			closeOnBlur={false}
			content={<DateTimeRangePicker endDate={endDate} startDate={startDate} onChange={onChange} />}
			header={<strong>{headerText}</strong>}
			isOpen={isOpen}
			onClose={onClose}
			trigger={
				<IconButton
					borderless
					buttonSize={ButtonSize.SMALL}
					buttonType={ButtonType.MINIMAL}
					className={'ee-edit-calendar-date-range-btn'}
					color={'white'}
					onClick={onOpen}
					tooltip={tooltip}
					icon={CalendarOutlined}
				/>
			}
		/>
	);
};

export default EditDateRangeButton;
