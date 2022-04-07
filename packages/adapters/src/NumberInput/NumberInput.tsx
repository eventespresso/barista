import { forwardRef, useCallback } from 'react';
import {
	NumberInput as ChakraNumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/react';

import { isRTL } from '@eventespresso/i18n';

import type { NumberInputProps } from './types';

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
	(
		{
			className,
			decrementStepperProps,
			isDisabled,
			id,
			incrementStepperProps,
			inputFieldProps,
			inputStepperProps,
			onChange,
			onChangeValue,
			placeholder,
			showStepper = true,
			value,
			wrapperClass,
			...props
		},
		ref
	) => {
		const size = inputFieldProps?.size && Number(inputFieldProps?.size);

		const onChangeHandler = useCallback<NumberInputProps['onChange']>(
			(valueAsString, valueAsNumber) => {
				if (!isDisabled) {
					onChangeValue?.(valueAsNumber);

					onChange?.(valueAsString, valueAsNumber);
				}
			},
			[isDisabled, onChange, onChangeValue]
		);

		const stepper = showStepper && (
			<NumberInputStepper {...inputStepperProps}>
				<NumberIncrementStepper {...incrementStepperProps} />
				<NumberDecrementStepper {...decrementStepperProps} />
			</NumberInputStepper>
		);

		return (
			<ChakraNumberInput
				{...props}
				className={wrapperClass}
				isDisabled={isDisabled}
				onChange={onChangeHandler}
				value={value}
				ref={ref}
			>
				{isRTL() && stepper}
				<NumberInputField
					{...inputFieldProps}
					className={className}
					id={id}
					placeholder={placeholder}
					size={size}
				/>
				{!isRTL() && stepper}
			</ChakraNumberInput>
		);
	}
);
