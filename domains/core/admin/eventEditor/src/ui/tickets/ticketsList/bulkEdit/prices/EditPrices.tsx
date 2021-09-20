import { useState } from 'react';

import { __ } from '@eventespresso/i18n';

import { EntityEditModal } from '@eventespresso/ui-components';
import { EditModeButtons } from './buttons';
import { EditTogether } from './editTogether';
import { EditSeparately } from './editSeparately';
import type { EditMode, EditPricesBaseProps } from './types';

const EditPrices: React.FC<EditPricesBaseProps> = ({ onClose, isOpen }) => {
	const [editMode, setEditMode] = useState<EditMode>();

	return (
		<EntityEditModal
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={true}
			title={__('Bulk edit ticket prices')}
			showAlertOnClose={false}
		>
			{!editMode && <EditModeButtons setEditMode={setEditMode} />}
			{editMode === 'together' && <EditTogether onClose={onClose} />}
			{editMode === 'separate' && <EditSeparately onClose={onClose} />}
		</EntityEditModal>
	);
};

export default EditPrices;
