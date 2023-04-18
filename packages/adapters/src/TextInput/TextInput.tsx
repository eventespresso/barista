import { useMemo, forwardRef } from 'react';

import { Input as ChakraInput, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';

import { useOnChange } from '@eventespresso/hooks';
import type { TextInputProps } from './types';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	(
		{ addonBefore, addonAfter, addonBeforeProps, addonAfterProps, disabled, onChange, onChangeValue, ...props },
		ref
	) => {
		const onChangeHandlerArg = useMemo(
			() => ({ isDisabled: disabled, onChange, onChangeValue }),
			[onChange, onChangeValue, disabled]
		);
		const onChangeHandler = useOnChange(onChangeHandlerArg);

		const input = (
			<ChakraInput {...props} isDisabled={disabled} onChange={onChangeHandler} ref={ref} variant='unstyled' />
		);

		if (!addonBefore && !addonAfter) {
			return input;
		}

		return (
			<InputGroup>
				{addonBefore && <InputLeftAddon {...addonBeforeProps}>{addonBefore}</InputLeftAddon>}
				{input}
				{addonAfter && <InputRightAddon {...addonAfterProps}>{addonAfter}</InputRightAddon>}
			</InputGroup>
		);
	}
);
