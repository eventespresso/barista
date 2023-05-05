import { useCallback, useMemo, useRef } from 'react';

import { __ } from '@eventespresso/i18n';
import { useDisclosure } from '@eventespresso/hooks';
import { AlertDialog, AlertType, Button } from '../';
import { Check, ExclamationCircle } from '@eventespresso/icons';
import type { ConfirmProps } from './types';

type UseConfirmationDialog = {
	confirmationDialog: React.ReactNode;
	onOpen: VoidFunction;
};

const useConfirmationDialog = ({
	addIconBG = false,
	alertType = AlertType.PRIMARY,
	icon = ExclamationCircle,
	message,
	noButtonText,
	onCancel,
	onConfirm,
	title,
	yesButtonText,
	...props
}: ConfirmProps): UseConfirmationDialog => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	const onClickHandler = useCallback(() => {
		onConfirm?.();
		onClose();
	}, [onClose, onConfirm]);

	const onCancelHandler = useCallback(() => {
		onClose();
		onCancel?.();
	}, [onCancel, onClose]);

	return useMemo(() => {
		const cancelText = noButtonText || __('cancel');
		const confirmText = yesButtonText || __('confirm');

		const cancelButton = <Button buttonText={cancelText} ref={cancelRef} onClick={onCancelHandler} />;

		const okButton = (
			<Button buttonText={confirmText} buttonType={alertType} icon={Check} onClick={onClickHandler} />
		);

		const confirmationDialog = (
			<AlertDialog
				addIconBG={addIconBG}
				alertType={alertType}
				body={message || __('Changes will be lost if you proceed.')}
				cancelButton={cancelButton}
				className='ee-confirmation-dialog'
				header={title}
				icon={icon}
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				okButton={okButton}
				onClose={onCancelHandler}
				{...props}
			/>
		);

		return { confirmationDialog, onOpen };
	}, [
		addIconBG,
		alertType,
		icon,
		isOpen,
		message,
		noButtonText,
		onCancelHandler,
		onClickHandler,
		onOpen,
		props,
		title,
		yesButtonText,
	]);
};

export default useConfirmationDialog;
