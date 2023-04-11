import { InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';

import type { InputWithLabelProps } from './types';

export const InputWithLabel: React.FC<InputWithLabelProps> = ({ children, className, leftLabel, rightLabel }) => {
	return (
		<InputGroup className={className}>
			{leftLabel && <InputLeftAddon className='ee-input-with-label__left-addon'>{leftLabel}</InputLeftAddon>}
			{children}
			{rightLabel && <InputRightAddon className='ee-input-with-label__right-addon'>{rightLabel}</InputRightAddon>}
		</InputGroup>
	);
};
