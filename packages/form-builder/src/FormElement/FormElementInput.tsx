import { memo, useMemo } from 'react';

import { FormControl, FormHelperText } from '@eventespresso/adapters';
import { AnyObject, getPropsAreEqual, safeNumber } from '@eventespresso/utils';
import { getDaysDropdownOptions, getMonthsDropdownOptions, getYearsDropdownOptions } from '@eventespresso/dates';

import { MappedElement } from './MappedElement';
import type { FormElementProps } from '../types';
import { useUpdateElement } from './useUpdateElement';
import { isButtonField } from '../utils';

export const FormElementInput = memo<FormElementProps>(({ element }) => {
	const onChangeValue = useUpdateElement(element);

	const label = element.label?.publicLabel || element.label?.adminLabel;

	const props = useMemo(() => {
		let inputProps: AnyObject = {
			placeholder: element.attributes?.placeholder,
			// ensure that the field is not required inside form builder 😄
			required: false,
		};
		switch (element.type) {
			case 'BUTTON':
			case 'RESET':
				inputProps.buttonText = label;
				break;
			case 'CHECKBOX_MULTI':
			case 'RADIO':
			case 'SELECT':
			case 'SELECT_MULTI':
				// Display only the options which have both value and label
				inputProps.options = (element.options || []).filter(({ value, label }) => value && label);
				break;
			case 'SELECT_COUNTRY':
			case 'SELECT_STATE':
				// TODO generate the options dynamically
				inputProps.options = element.options || [];
				break;
			case 'DAY_SELECT':
				inputProps.options = getDaysDropdownOptions();
				break;
			case 'MONTH_SELECT':
				inputProps.options = getMonthsDropdownOptions();
				break;
			case 'YEAR_SELECT':
				// TODO add configuration for this dropdown
				inputProps.options = getYearsDropdownOptions({ endYear: 'current' });
				break;
			case 'DATE':
			case 'DATETIME_LOCAL':
			case 'MONTH':
			case 'WEEK':
			case 'TIME':
				inputProps = {
					...inputProps,
					// Datepicker has to be controlled, so we need to pass the value and onChange
					value: element.value,
					onChange: onChangeValue('value'),
				};
				break;
			case 'EMAIL':
			case 'PASSWORD':
			case 'TEL':
			case 'TEXT':
			case 'URL':
				inputProps.type = element.type.toLowerCase();
				break;
			case 'EMAIL_CONFIRMATION':
				inputProps.type = 'email';
				break;
			case 'PASSWORD_CONFIRMATION':
				inputProps.type = 'password';
				break;
			case 'DECIMAL':
			case 'INTEGER':
			case 'RANGE':
				// ensure that min/max is number and not NaN
				inputProps.min = safeNumber(element.attributes?.min);
				inputProps.max = safeNumber(element.attributes?.max);
				inputProps.step = safeNumber(element.attributes?.step);
				inputProps.size = safeNumber(element.attributes?.size);
				break;
			case 'HTML':
				inputProps.value = element.label?.html;
				inputProps.toolbarHidden = true;
				inputProps.readonly = true;
				inputProps.isDisabled = true;
				break;
		}
		return inputProps;
	}, [element, label, onChangeValue]);

	return (
		<FormControl className='ee-form-element__input'>
			<MappedElement
				elementType={element.type}
				id={element.id}
				isRequired={element.required?.required}
				// Buttons do not need external label
				label={isButtonField(element) ? null : label}
				{...props}
			/>
			{element.helpText?.helpText && <FormHelperText>{element.helpText?.helpText}</FormHelperText>}
		</FormControl>
	);
}, getPropsAreEqual([['element']]));
