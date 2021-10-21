import classNames from 'classnames';

import { DatePicker as DatepickerAdapter } from '@eventespresso/dates';

import withoutMetaProp from './withoutMetaProp';
import { useFormConfig } from '../hooks';
import type { FieldRendererProps } from '../types';

const DatePicker: React.FC<FieldRendererProps> = ({ className, input: { onChange, ...input }, ...props }) => {
	const htmlClass = classNames(className, 'ee-date-picker', 'ee-calendar-datetime-picker', 'ee-input-base-wrapper');

	const { locale, dateFormat } = useFormConfig();

	return (
		<div className={htmlClass}>
			<DatepickerAdapter {...input} dateFormat={dateFormat} locale={locale} {...props} onChange={onChange} />
		</div>
	);
};

export default withoutMetaProp(DatePicker);
