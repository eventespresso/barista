import React from 'react';
import { __ } from '@eventespresso/i18n';

import { EntityEditModal, ErrorMessage } from '@eventespresso/components';
import type { EspressoFormProps } from '@eventespresso/form';

import FormWrapper from './FormWrapper';
import { FormWithConfig } from '../../FormWithConfig';

import './styles.scss';

export interface BulkEditDetailsProps {
	formConfig: EspressoFormProps;
	isOpen: boolean;
	onClose: VoidFunction;
	title?: string;
	warning?: string;
}

export const BulkEditDetails: React.FC<BulkEditDetailsProps> = ({ isOpen, onClose, formConfig, title, warning }) => {
	const message = __('Note: ') + (warning || __('any changes will be applied to ALL of the selected entities.'));
	return (
		<EntityEditModal
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={true}
			title={title || __('Bulk edit details')}
		>
			<ErrorMessage message={message} />
			<FormWithConfig {...formConfig} formWrapper={FormWrapper} />
		</EntityEditModal>
	);
};
