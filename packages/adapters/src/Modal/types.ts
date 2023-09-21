import type { AriaAttributes } from 'react';
import { ModalProps as ModalAdapterProps } from '@chakra-ui/react';

export interface ModalProps
	extends Pick<
		ModalAdapterProps,
		'closeOnOverlayClick' | 'closeOnEsc' | 'finalFocusRef' | 'isOpen' | 'onClose' | 'scrollBehavior'
	> {
	bodyClassName?: string;
	className?: string;
	closeButton?: React.ReactNode;
	footer?: React.ReactNode;
	footerClassName?: string;
	isClosable?: boolean;
	headerClassName?: string;
	title?: React.ReactNode;
	ariaAttributes?: {
		modalContent?: AriaAttributes;
		modalHeader?: AriaAttributes;
		modalBody?: AriaAttributes;
		modalFooter?: AriaAttributes;
	};
}
