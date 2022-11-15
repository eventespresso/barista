import { useCallback, useMemo, useState } from 'react';

import { getOptionValues } from '@eventespresso/utils';

import { SelectWithLabel } from './Select';
import { TextInputWithLabel } from '../TextInput';

export interface SelectWithCustomTextProps extends Omit<React.ComponentProps<typeof SelectWithLabel>, 'onChange'> {
	inputLabel?: string;
	inputProps?: React.ComponentProps<typeof TextInputWithLabel>;
	customOptionValue?: React.ReactText;
}

/**
 * A composite component to provide a select dropdown and a text input
 * The text input will be shown when `customOptionValue` is selected from the dropdown
 * or if the `defaultValue` or `value` is not among the provided options
 */
export const SelectWithCustomText: React.FC<SelectWithCustomTextProps> = ({
	defaultValue,
	inputLabel,
	inputProps,
	onChangeValue,
	options,
	customOptionValue,
	value,
	...props
}) => {
	// This is the initial value, both for controlled and un-controlled usage
	const initialValue = value || defaultValue;
	// This is the current value that will be sent back to the consumer
	const [currentValue, setCurrentValue] = useState(initialValue);
	// Collect all the option value keys
	const optionValues = useMemo(() => getOptionValues(options), [options]);
	// This is the value for custom text input.
	// This is maintained separately to retain the value if the user changes the dropdown
	// and then again selects `customOptionValue`
	const [inputValue, setInputValue] = useState(() => {
		// If `initialValue` is NOT in the provided dropdown options,
		// it means some custom value has been passed, we will use it as the initial input value
		// otherwise an option from the available options is passed, thus we set the input to empty string
		return !optionValues.includes(initialValue as string) ? initialValue : '';
	});
	// This is the value that gets passed to the select dropdown
	// If `currentValue` is NOT in the provided dropdown options,
	// it means some custom value has been entered, thus we will set the selected value to `customOptionValue`
	const val4Select = !optionValues.includes(currentValue as string) ? customOptionValue : currentValue;

	const onChangeCurrentValue = useCallback(
		(newValue) => {
			setCurrentValue(newValue);
			// If the new value equals to `customOptionValue`, we will pass the custom input value
			const changedValue = newValue === customOptionValue ? inputValue : newValue;
			onChangeValue?.(changedValue as string);
		},
		[customOptionValue, inputValue, onChangeValue]
	);

	const onChangeInput = useCallback(
		(newValue) => {
			setInputValue(newValue);
			onChangeCurrentValue(newValue);
		},
		[onChangeCurrentValue]
	);

	return (
		<>
			<SelectWithLabel options={options} value={val4Select} onChangeValue={onChangeCurrentValue} {...props} />

			{customOptionValue === val4Select && (
				<TextInputWithLabel
					label={inputLabel}
					{...inputProps}
					onChangeValue={onChangeInput}
					value={inputValue}
				/>
			)}
		</>
	);
};
