import { ButtonGroup as ChakraButtonGroup } from '@chakra-ui/react';

import type { ButtonGroupProps } from './types';

export const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
	return <ChakraButtonGroup {...props} />;
};
