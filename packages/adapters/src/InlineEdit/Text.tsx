import * as Chakra from '@chakra-ui/react';

import type { Props } from './types';

export const Text: React.FC<Props.InputForText> = (props) => {
	return <Chakra.EditableInput {...props} />;
};
