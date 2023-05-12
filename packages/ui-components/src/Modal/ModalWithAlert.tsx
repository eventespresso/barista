import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';

import { Modal } from './Modal';
import { useConfirmationDialog } from '../Confirm';
import useCancelButtonProps from './useCancelButtonProps';
import useSubmitButtonProps from './useSubmitButtonProps';
import { ModalWithAlertProps } from './types';

export const ModalWithAlert: React.FC<ModalWithAlertProps> = ({
	alertText,
	children,
	isSubmitDisabled,
	onCancel,
	onClose,
	onSubmit,
	showAlertOnClose = true,
	...props
}) => {
	const { confirmationDialog, onOpen: showAlert } = useConfirmationDialog({
		message: alertText,
		onConfirm: onClose as VoidFunction,
		title: __('Are you sure you want to close this?'),
		yesButtonText: __('Yes, discard changes'),
	});

	/**
	 * This handler is called when:
	 * - User clicks on the close button
	 * - Esc is pressed on keyboard and closeOnEsc is not disabled
	 * - User clicks on the modal overlay and closeOnOverlayClick is not disabled
	 */
	const onCloseHandler = useCallback<ModalWithAlertProps['onClose']>(
		(...args) => (showAlertOnClose ? showAlert() : onClose?.(...args)),
		[showAlertOnClose, showAlert, onClose]
	);

	const onCancelHandler = useCallback<ModalWithAlertProps['onCancel']>(
		() => (showAlertOnClose ? showAlert() : onCancel?.()),
		[showAlertOnClose, showAlert, onCancel]
	);

	const cancelButtonProps = useCancelButtonProps(onCancel && onCancelHandler);
	const submitButtonProps = useSubmitButtonProps(onSubmit, isSubmitDisabled);

	return (
		<>
			<Modal
				{...props}
				cancelButtonProps={props.cancelButtonProps || cancelButtonProps}
				onClose={onCloseHandler}
				submitButtonProps={props.submitButtonProps || submitButtonProps}
			>
				{children}
			</Modal>
			{showAlertOnClose && confirmationDialog}
		</>
	);
};
