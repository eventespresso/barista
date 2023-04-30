import { __ } from '@eventespresso/i18n';

import { DatePicker } from './DatePicker';

import { DEFAULT_TIME_FORMAT } from '../constants';
import { stripTimezoneFormat } from '../../../predicates';
import type { DatePickerProps } from '../types';

export const TimePicker: React.FC<DatePickerProps> = (props) => {
	const timeFormat = stripTimezoneFormat(props?.timeFormat ?? DEFAULT_TIME_FORMAT);
	return (
		<DatePicker
			calendarClassName='ee-timepicker'
			dateFormat={timeFormat}
			showTimeSelect
			showTimeSelectOnly
			timeCaption={__('time')}
			timeFormat={timeFormat}
			timeIntervals={15}
			{...props}
		/>
	);
};
