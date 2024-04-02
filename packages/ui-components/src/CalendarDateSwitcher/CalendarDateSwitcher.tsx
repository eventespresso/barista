import { parseISO, format } from 'date-fns';
import { __ } from '@eventespresso/i18n';

import { switchTenseForDate } from '@eventespresso/dates';
import { useMemoStringify } from '@eventespresso/utils';
import { BiggieCalendarDate, CalendarDateRange } from '../../';
import { DisplayStartOrEndDate } from './types';
import type { CalendarDateSwitcherProps } from './types';

const CalendarDateSwitcher: React.FC<CalendarDateSwitcherProps> = ({
	className,
	displayDate = DisplayStartOrEndDate.start,
	formatFn = format,
	labels,
	...props
}) => {
	const startDate = useMemoStringify(parseISO(props.startDate), [props.startDate]);
	const endDate = useMemoStringify(parseISO(props.endDate), [props.endDate]);

	let headerText = '';
	let footerText = '';
	if (labels) {
		const { footer = '', footerPast, footerFuture, header = '', headerPast, headerFuture } = labels;
		footerText = footerPast && footerFuture ? switchTenseForDate(endDate, footerPast, footerFuture) : footer;
		headerText = headerPast && headerFuture ? switchTenseForDate(startDate, headerPast, headerFuture) : header;
	}

	const start = (
		<BiggieCalendarDate
			className={className}
			date={startDate}
			footerText={footerText}
			formatFn={formatFn}
			headerText={headerText || __('starts')}
			showTime
		/>
	);

	switch (displayDate) {
		case 'end':
			return (
				<BiggieCalendarDate
					className={className}
					date={endDate}
					footerText={footerText}
					formatFn={formatFn}
					headerText={headerText || __('ends')}
					showTime
				/>
			);
		case 'both':
			return (
				<CalendarDateRange
					className={className}
					endDate={endDate}
					footerText={footerText}
					formatFn={formatFn}
					headerText={headerText}
					showTime
					startDate={startDate}
				/>
			);
		case 'start':
			return start;
		default:
			return start;
	}
};

export default CalendarDateSwitcher;
