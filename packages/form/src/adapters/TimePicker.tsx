import classNames from 'classnames';

import { TimePicker as TimePickerAdapter } from '@eventespresso/dates';

import withoutMetaProp from './withoutMetaProp';
import { useFormConfig } from '../hooks';
import type { FieldRendererProps } from '../types';

const TimePicker: React.FC<FieldRendererProps> = ({
	className,
	input: { onChange: onInputChange, value, ...input },
	...props
}) => {
	const { locale, timeFormat } = useFormConfig();

	const classname = classNames(className, 'ee-time-picker', 'ee-calendar-datetime-picker', 'ee-input-base-wrapper');

	return (
		<div className={classname}>
			<TimePickerAdapter
				{...input}
				locale={locale}
				timeFormat={timeFormat}
				value={value}
				{...props}
				onChange={onInputChange}
			/>
		</div>
	);
};

export default withoutMetaProp(TimePicker);
