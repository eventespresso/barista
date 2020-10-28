import React, { useEffect, useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { canUseDOM, isEscapeKey } from '@eventespresso/utils';
import { Modal } from './';
import { useConfirmationDialog } from '../Confirm';
import useCancelButtonProps from './useCancelButtonProps';
import useSubmitButtonProps from './useSubmitButtonProps';

import { ModalWithAlertProps } from './types';

export const ModalWithAlert: React.FC<ModalWithAlertProps> = ({
	children,
	onCancel,
	onSubmit,
	showAlertOnEscape,
	...props
}) => {
	const cancelButtonProps = useCancelButtonProps(onCancel);
	const submitButtonProps = useSubmitButtonProps(onSubmit);

	const title = props.header || __('Are you sure you want to close this?');

	const { confirmationDialog, onOpen } = useConfirmationDialog({
		title,
		onConfirm: props.onClose as VoidFunction,
	});

	const onEscape = useCallback(
		(e) => {
			if (isEscapeKey(e)) {
				onOpen();
			}
		},
		[onOpen]
	);

	useEffect(() => {
		if (canUseDOM) {
			document.addEventListener('keydown', onEscape);
		}

		return () => {
			if (canUseDOM) {
				document.removeEventListener('keydown', onEscape);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Modal
				{...props}
				closeOnEsc={!showAlertOnEscape}
				cancelButtonProps={props.cancelButtonProps || cancelButtonProps}
				submitButtonProps={props.submitButtonProps || submitButtonProps}
			>
				{children}
			</Modal>
			{showAlertOnEscape && confirmationDialog}
		</>
	);
};
