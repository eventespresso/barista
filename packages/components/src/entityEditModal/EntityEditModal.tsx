import React from 'react';
import { __ } from '@wordpress/i18n';

import { Modal } from '@eventespresso/adapters';
import { EntityEditModalProps } from './types';

import './styles.scss';

const EntityEditModal: React.FC<EntityEditModalProps> = ({ isOpen, onClose, title, children }) => {
	return (
		<Modal
			bodyClassName='ee-entity-edit-modal__body'
			className='ee-entity-edit-modal'
			closeOnOverlayClick={false}
			isOpen={isOpen}
			onClose={onClose}
			title={title}
		>
			{children}
		</Modal>
	);
};

export default EntityEditModal;
