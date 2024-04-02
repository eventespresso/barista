import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { CalendarOutlined } from '@eventespresso/icons';
import { useDisclosure, useViewportWidthGreaterThan } from '@eventespresso/hooks';
import { useMemoStringify } from '@eventespresso/utils';
import { RESPONSIVE_CARD_SWITCH_BREAKPOINT } from '@eventespresso/constants';

import { ButtonType, DateTimeRangePicker, IconButton, Popover } from '../../';
import type { DateRange } from '@eventespresso/dates';
import type { EditDateRangeButtonProps } from './types';

import './styles.scss';

export const EditDateRangeButton: React.FC<EditDateRangeButtonProps> = ({
	dateTimeFormat,
	header,
	locale,
	onChange,
	startDate,
	endDate,
	popoverPlacement,
	TimezoneTimeInfo,
	tooltip,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const isMobile = !useViewportWidthGreaterThan(RESPONSIVE_CARD_SWITCH_BREAKPOINT);

	const onChangeHandler = useCallback(
		(dates: DateRange) => {
			onChange(dates);
			onClose();
		},
		[onClose, onChange]
	);
	const value = useMemoStringify<DateRange>([startDate, endDate]);

	const content = (
		<DateTimeRangePicker
			dateAjustedMessage={__('End date has been adjusted')}
			dateFormat={dateTimeFormat}
			enforceDatesInOrder
			locale={locale}
			onChange={onChangeHandler}
			TimezoneTimeInfo={TimezoneTimeInfo}
			value={value}
		/>
	);

	const headerText = header ? header : __('Edit Start and End Dates and Times');

	const placement = isMobile ? 'auto' : popoverPlacement;

	return (
		<Popover
			isLazy
			className='ee-edit-calendar-date-range'
			closeOnBlur={false}
			content={content}
			header={<strong>{headerText}</strong>}
			isOpen={isOpen}
			onClose={onClose}
			placement={placement}
			trigger={
				<IconButton
					aria-label={headerText}
					borderless
					buttonType={ButtonType.MINIMAL}
					className={'ee-edit-calendar-date-range-btn'}
					color={'white'}
					icon={CalendarOutlined}
					onClick={onOpen}
					size='small'
					tooltip={tooltip}
					transparentBg
				/>
			}
		/>
	);
};
