import classNames from 'classnames';
import { FormHelperText as ChakraFormHelperText } from '@chakra-ui/react';

import type { FormHelperTextProps } from './types';

export const FormHelperText: React.FC<FormHelperTextProps> = ({ children, className, id }) => (
	<ChakraFormHelperText className={classNames('ee-form-element__helper-text', className)} id={id}>
		{children}
	</ChakraFormHelperText>
);
