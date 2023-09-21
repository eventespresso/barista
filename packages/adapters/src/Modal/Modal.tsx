import {
	Modal as ChakraModal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

import type { ModalProps } from './types';

export const Modal: React.FC<ModalProps> = ({
	bodyClassName,
	children,
	className,
	closeButton,
	footer,
	footerClassName,
	headerClassName,
	isClosable,
	isOpen,
	scrollBehavior = 'inside',
	title,
	ariaAttributes,
	...props
}) => {
	return (
		<ChakraModal
			{...props}
			closeOnOverlayClick={isClosable}
			isCentered
			isOpen={isOpen}
			scrollBehavior={scrollBehavior}
		>
			<ModalOverlay />
			<ModalContent role='alertdialog' className={className} {...ariaAttributes?.modalContent}>
				<ModalHeader className={headerClassName} {...ariaAttributes?.modalHeader}>
					{title}
					{closeButton}
				</ModalHeader>

				<ModalBody className={bodyClassName} {...ariaAttributes?.modalBody}>
					{children}
				</ModalBody>

				{footer && (
					<ModalFooter className={footerClassName} {...ariaAttributes?.modalFooter}>
						{footer}
					</ModalFooter>
				)}
			</ModalContent>
		</ChakraModal>
	);
};
