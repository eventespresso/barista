import { __ } from '@eventespresso/i18n';

import { DatePicker } from './DatePicker';
import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from '../constants';
import { stripTimezoneFormat } from '../../../predicates';
import type { DatePickerProps } from '../types';

export const DateTimePicker: React.FC<DatePickerProps> = (props) => {
	let dateFormat = Array.isArray(props?.dateFormat) ? props?.dateFormat[0] : props?.dateFormat;
	dateFormat = stripTimezoneFormat(dateFormat ?? DEFAULT_DATE_FORMAT);
	const timeFormat = stripTimezoneFormat(props?.timeFormat ?? DEFAULT_TIME_FORMAT);
	return (
		<DatePicker
			calendarClassName='ee-datetime-picker'
			dateFormat={dateFormat}
			showTimeSelect
			timeCaption={__('time')}
			timeFormat={timeFormat}
			timeIntervals={15}
			{...props}
		/>
	);
};
