import { forwardRef } from 'react';
import classNames from 'classnames';

import { NumberInput as NumberInputAdapter, NumberInputProps } from '@eventespresso/adapters';

import { withLabel } from '../withLabel';

import './style.scss';

interface NumberProps extends NumberInputProps {
	inputClass?: string;
	visibleDigits?: number;
	wrapperClass?: string;
}

const inputStepperProps = { className: 'ee-number-field-stepper' };

export const NumberInput = forwardRef<HTMLInputElement, NumberProps>(
	({ inputClass, onChange, showStepper, value, visibleDigits, wrapperClass, ...props }, ref) => {
		const visibleDigitsClassName =
			showStepper === false &&
			visibleDigits &&
			`ee-number-input--visible-digits ee-number-input--visible-digits-${visibleDigits}`;

		const inputClassName = classNames('ee-number-input ee-input-base', inputClass);
		const wrapperClassName = classNames(
			'ee-number-input__wrap',
			visibleDigitsClassName,
			props.className,
			wrapperClass
		);

		// const NumberValue = String(value)?.length ? Number(value) : null;

		return (
			<NumberInputAdapter
				{...props}
				// aria-valuenow={ariaValuenow}
				className={inputClassName}
				inputStepperProps={inputStepperProps}
				onChange={onChange}
				ref={ref}
				showStepper={showStepper}
				value={value}
				wrapperClass={wrapperClassName}
			/>
		);
	}
);

export const NumberInputWithLabel = withLabel(NumberInput);
