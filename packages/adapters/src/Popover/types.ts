import type { PopoverProps as ChakraPopoverProps } from '@chakra-ui/react';

type PickedProps = 'closeOnBlur' | 'isOpen' | 'isLazy' | 'onClose' | 'placement' | 'initialFocusRef';

export interface PopoverProps extends Pick<ChakraPopoverProps, PickedProps> {
	className?: string;
	content?: React.ReactNode;
	contentClassName?: string;
	header?: React.ReactNode;
	footer?: React.ReactNode;
	trigger?: React.ReactNode;
}
