import React, { useState } from 'react';
import { __ } from '@eventespresso/i18n';

import { EntityEditModal } from '@eventespresso/components';
import { EditModeButtons } from './buttons';
import { EditMode, EditPricesBaseProps } from './types';
import { EditTogether } from './editTogether';
import { EditSeparately } from './editSeparately';

const EditPrices: React.FC<EditPricesBaseProps> = ({ onClose, isOpen }) => {
	const [editMode, setEditMode] = useState<EditMode>();

	return (
		<EntityEditModal
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={true}
			title={__('Bulk edit ticket prices')}
		>
			{!editMode && <EditModeButtons setEditMode={setEditMode} />}
			{editMode === 'together' && <EditTogether onClose={onClose} />}
			{editMode === 'separate' && <EditSeparately onClose={onClose} />}
		</EntityEditModal>
	);
};

export default EditPrices;
