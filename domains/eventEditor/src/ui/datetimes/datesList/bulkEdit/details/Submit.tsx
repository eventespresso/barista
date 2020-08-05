import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import type { FormRenderProps } from 'react-final-form';
import type { FormState } from 'final-form';

import { Button, ButtonRow, ButtonType, useConfirmationDialog } from '@eventespresso/components';
import { BulkEditFormShape } from './types';

const subscription = { submitting: true, hasValidationErrors: true, hasSubmitErrors: true, pristine: true };

const Submit: React.FC<Pick<FormRenderProps<BulkEditFormShape>, 'form'>> = ({ form }) => {
	const [formState, setFormState] = useState<Partial<FormState<BulkEditFormShape>>>({});

	const { submitting, hasValidationErrors, hasSubmitErrors, pristine } = formState;
	const isSubmitDisabled = submitting || hasValidationErrors || hasSubmitErrors;

	useEffect(() => {
		// subscribe to RFF state.
		const unsubscribe = form.subscribe((state) => {
			setFormState(state);
		}, subscription);

		// housekeeping
		return unsubscribe;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { confirmationDialog, onOpen } = useConfirmationDialog({
		message: __('Are you sure you want to update the selected dates?'),
		title: __('Bulk update date details'),
		onConfirm: form.submit,
	});

	return (
		<ButtonRow rightAligned>
			<Button
				buttonText={__('Submit')}
				buttonType={ButtonType.PRIMARY}
				isDisabled={isSubmitDisabled}
				type='submit'
				onClick={onOpen}
			/>
			{confirmationDialog}
			<Button buttonText={__('Reset')} isDisabled={pristine} type='reset' onClick={() => form.reset()} />
		</ButtonRow>
	);
};

export default Submit;
