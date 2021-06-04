import { useMemo } from 'react';

import { FormControl } from '@eventespresso/adapters';
import type { AnyObject } from '@eventespresso/utils';

import { MappedElement } from './MappedElement';
import type { FormElementProps } from '../types';
import { useUpdateElement } from './useUpdateElement';

export const FormElementInput: React.FC<FormElementProps> = ({ element }) => {
	const onChangeValue = useUpdateElement(element);

	const props = useMemo(() => {
		let inputProps: AnyObject = {
			placeholder: element.placeholder,
		};
		switch (element.type) {
			case 'checkbox-multi':
			case 'radio':
			case 'select':
				// Display only the options which have both value and label
				inputProps.options = (element.options || []).filter(({ value, label }) => value && label);
				break;
			case 'select-country':
			case 'select-state':
			case 'month-select':
			case 'year-select':
				// TODO generate the options dynamically
				inputProps.options = element.options || [];
				break;
			case 'date':
			case 'datetime-local':
			case 'month':
			case 'week':
			case 'time':
				inputProps = {
					...inputProps,
					// Datepicker has to be controlled, so we need to pass the value and onChange
					value: element.value,
					onChange: onChangeValue('value'),
				};
				switch (element.type) {
					// TODO update formats from site config
					case 'month':
						inputProps = {
							...inputProps,
							showMonthYearPicker: true,
							dateFormat: 'MM/yyyy',
						};
						break;
					// add more cases in future
				}
				break;
			case 'email':
			case 'password':
			case 'tel':
			case 'text':
			case 'url':
				inputProps.type = element.type;
				break;
			case 'email-confirmation':
				inputProps.type = 'email';
				break;
			case 'decimal':
			case 'integer':
				inputProps.min = element.min;
				inputProps.max = element.max;
				break;
		}
		return inputProps;
	}, [element, onChangeValue]);

	return (
		<FormControl className='ee-form-element__input' isRequired={element.required}>
			<MappedElement type={element.type} id={element.UUID} label={element.publicLabel} {...props} />
		</FormControl>
	);
};
