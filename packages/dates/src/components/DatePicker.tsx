import { forwardRef, memo, useMemo } from 'react';

import ReactDatePicker from 'react-datepicker';
import * as locales from 'date-fns/locale';

import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from '../constants';
import { stripTimezoneFormat } from '../../../predicates';
import { DatePickerProps } from '../types';

import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const DatePicker: React.FC<DatePickerProps> = ({ inputValue, locale, onChange, value, ...props }) => {
	let dateFormat = Array.isArray(props?.dateFormat) ? props?.dateFormat[0] : props?.dateFormat;
	dateFormat = stripTimezoneFormat(dateFormat ?? DEFAULT_DATE_FORMAT);
	const timeFormat = stripTimezoneFormat(props?.timeFormat ?? DEFAULT_TIME_FORMAT);

	// get locale object from date-fns
	// we need to change "en_US" to "enUS"
	const datefnsLocale = useMemo(() => locales?.[locale?.replace(/-_/, '')] ?? locales.enUS, [locale]);

	// 'react-datepicker' doesn't pass all the aria props to the input,
	// So we need to use a custom input to pass those props
	const CustomInput = memo(
		forwardRef<HTMLInputElement, InputProps>((inputProps, ref) => (
			<input
				aria-label={props['aria-label']}
				aria-describedby={props['aria-describedby']}
				aria-invalid={props['aria-invalid']}
				aria-labelledby={props['aria-labelledby']}
				aria-required={props['aria-required']}
				className='react-datepicker-ignore-onclickoutside'
				type='text'
				{...inputProps}
				ref={ref}
			/>
		))
	);

	return (
		<ReactDatePicker
			{...props}
			calendarClassName='ee-datepicker'
			customInput={<CustomInput />}
			dateFormat={dateFormat}
			locale={datefnsLocale}
			onChange={onChange}
			selected={value}
			timeFormat={timeFormat}
			timeIntervals={15}
			value={inputValue}
		/>
	);
};
