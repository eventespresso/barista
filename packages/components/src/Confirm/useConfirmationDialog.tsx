import React, { useCallback, useMemo } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { __ } from '@wordpress/i18n';

import { AlertDialog } from '@eventespresso/adapters';
import { Button, ButtonType } from '../Button';
import type { ConfirmProps } from './types';

type UseConfirmationDialog = {
	confirmationDialog: React.ReactNode;
	onOpen: VoidFunction;
};

const useConfirmationDialog = ({
	message,
	onConfirm,
	title,
	onCancel,
	...props
}: ConfirmProps): UseConfirmationDialog => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const onClickHandler = useCallback(() => {
		if (typeof onConfirm === 'function') {
			onConfirm();
		}
		onClose();
	}, [onClose, onConfirm]);

	const onCancelHandler = useCallback(() => {
		onClose();
		onCancel?.();
	}, [onCancel, onClose]);

	const noButtonText = props.noButtonText || __('No');
	const yesButtonText = props.yesButtonText || __('Yes');

	const cancelButton = <Button buttonText={noButtonText} ref={cancelRef} onClick={onCancelHandler} />;

	const okButton = (
		<Button buttonText={yesButtonText} buttonType={ButtonType.ACCENT} onClick={onClickHandler} ml={3} />
	);

	const confirmationDialog = (
		<AlertDialog
			cancelButton={cancelButton}
			header={title}
			body={message}
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			okButton={okButton}
			onClose={onCancelHandler}
		/>
	);

	return useMemo(
		() => ({
			confirmationDialog,
			onOpen,
		}),
		[confirmationDialog, onOpen]
	);
};

export default useConfirmationDialog;
