import type { AriaAttributes } from 'react';
import type { HeadingProps as ChakraHeadingProps } from '@eventespresso/adapters';

export interface HeadingProps extends ChakraHeadingProps, AriaAttributes {
	topBordered?: boolean;
}
