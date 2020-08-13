import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoForm } from '@eventespresso/form';
import type { EspressoFormProps } from '@eventespresso/form';

import { EntityEditModal } from '../../';
import FormWrapper from './FormWrapper';
import Warning from './Warning';

import './styles.scss';

export interface BulkEditDetailsProps {
	formConfig: EspressoFormProps;
	isOpen: boolean;
	onClose: VoidFunction;
	title?: string;
	warning?: string;
}

export const BulkEditDetails: React.FC<BulkEditDetailsProps> = ({ isOpen, onClose, formConfig, title, warning }) => {
	return (
		<EntityEditModal
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={true}
			title={title || __('Bulk edit details')}
		>
			<Warning message={warning} />
			<EspressoForm {...formConfig} formWrapper={FormWrapper} />
		</EntityEditModal>
	);
};
