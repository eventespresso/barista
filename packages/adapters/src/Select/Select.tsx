import { useMemo, forwardRef } from 'react';

import { Select as ChakraSelect } from '@chakra-ui/react';

import { useOnChange } from '@eventespresso/hooks';
import type { SelectProps } from './types';

const DEFAULT_OPTIONS = [];

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ children, className, options = DEFAULT_OPTIONS, onChange, onChangeValue, ...props }, ref) => {
		const onChangeHandlerArg = useMemo(() => ({ onChange, onChangeValue }), [onChange, onChangeValue]);
		const onChangeHandler = useOnChange(onChangeHandlerArg);

		const childNodes =
			children ||
			options.map(({ label, options: optionGroups, value, ...optionProps }, index: number) => {
				if (optionGroups?.length && label) {
					return (
						<optgroup label={label as string} key={`${label}${index}`} {...optionProps}>
							{optionGroups.map(({ label: optLabel, value, ...optProps }, i: number) => {
								const oProps = { ...optProps };
								if (props.value === value) {
									oProps['data-selected'] = true;
								}
								return (
									<option {...oProps} value={value} key={`${value}${i}`}>
										{optLabel}
									</option>
								);
							})}
						</optgroup>
					);
				}

				const oProps = { ...optionProps };
				if (props.value === value) {
					oProps['data-selected'] = true;
				}
				return (
					<option {...oProps} value={value} key={`${value}${index}`}>
						{label}
					</option>
				);
			});

		return (
			<ChakraSelect {...props} ref={ref} className={className} iconSize='0px' onChange={onChangeHandler}>
				{childNodes}
			</ChakraSelect>
		);
	}
);
