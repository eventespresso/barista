import { useMemo } from 'react';

import { DateTimePicker, DatePicker, DatePickerProps } from '@eventespresso/dates';

import { useRRuleConfig } from '../../hooks';

export interface OnDateProps extends Omit<DatePickerProps, 'value'> {
	date: Date;
	label?: string;
}

const OnDate: React.FC<OnDateProps> = ({ id, date, label, maxDate, onChange }) => {
	const { locale, calendarComponent, enableTimepicker } = useRRuleConfig();

	const DateComponent = calendarComponent || (enableTimepicker ? DateTimePicker : DatePicker);

	const calendarAttributes = useMemo(
		() => ({
			'aria-label': label,
			id,
			locale,
			value: date,
		}),
		[date, id, label, locale]
	);

	return <DateComponent className='ee-datepicker' {...calendarAttributes} maxDate={maxDate} onChange={onChange} />;
};

export default OnDate;
