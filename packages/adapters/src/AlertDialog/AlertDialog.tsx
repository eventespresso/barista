import {
	AlertDialog as ChakraAlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from '@chakra-ui/react';

import type { AlertDialogProps } from './types';

export const AlertDialog: React.FC<AlertDialogProps> = ({
	body,
	cancelButton,
	dialogClassName,
	header,
	icon: Icon,
	isOpen,
	leastDestructiveRef,
	onClose,
	okButton,
}) => {
	const headerIcon = Icon ? <Icon /> : null;
	return (
		<ChakraAlertDialog isOpen={isOpen} leastDestructiveRef={leastDestructiveRef} onClose={onClose}>
			<AlertDialogOverlay />
			<AlertDialogContent className={dialogClassName}>
				{header && (
					<AlertDialogHeader className={'ee-alert-dialog__header'}>
						{headerIcon}
						{header}
					</AlertDialogHeader>
				)}
				<AlertDialogBody className={'ee-alert-dialog__body'}>{body}</AlertDialogBody>
				<AlertDialogFooter className={'ee-alert-dialog__footer'}>
					{cancelButton}
					{okButton}
				</AlertDialogFooter>
			</AlertDialogContent>
		</ChakraAlertDialog>
	);
};
