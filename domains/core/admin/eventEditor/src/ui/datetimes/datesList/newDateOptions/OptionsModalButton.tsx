import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { Button } from '@eventespresso/ui-components';
import { useGlobalModal } from '@eventespresso/registry';
import { Calendar } from '@eventespresso/icons';
import { EdtrGlobalModals } from '@eventespresso/edtr-services';

const OptionsModalButton: React.FC = ({ children }) => {
	const { openWithData } = useGlobalModal(EdtrGlobalModals.NEW_DATE);

	const onClick = useCallback(() => {
		openWithData({ children });
	}, [children, openWithData]);

	return (
		<Button
			buttonText={__('Add New Date')}
			buttonType='primary'
			icon={Calendar}
			mr={2}
			onClick={onClick}
			size='big'
		/>
	);
};

export default OptionsModalButton;
