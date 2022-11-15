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
	({ className, inputClass, showStepper, visibleDigits, wrapperClass, ...props }, ref) => {
		const visibleDigitsClassName =
			showStepper === false &&
			visibleDigits &&
			`ee-number-input--visible-digits ee-number-input--visible-digits-${visibleDigits}`;

		const inputClassName = classNames('ee-number-input ee-input-base', inputClass);
		const wrapperClassName = classNames('ee-number-input__wrap', visibleDigitsClassName, className, wrapperClass);

		return (
			<NumberInputAdapter
				{...props}
				className={inputClassName}
				inputStepperProps={inputStepperProps}
				ref={ref}
				showStepper={showStepper}
				wrapperClass={wrapperClassName}
			/>
		);
	}
);

export const NumberInputWithLabel = withLabel(NumberInput);
