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
		const ariaValueNow = String(value)?.length ? Number(value) : null;
		const size = inputFieldProps?.size && Number(inputFieldProps?.size);

		const onChangeHandler = useCallback<NumberInputProps['onChange']>(
			(valueAsString, valueAsNumber) => {
				if (!isDisabled) {
					onChange?.(valueAsString, valueAsNumber);
					onChangeValue?.(valueAsString);
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
				aria-valuenow={ariaValueNow}
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
