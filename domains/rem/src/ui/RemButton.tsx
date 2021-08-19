import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';

import { Button, NewEntityOption } from '@eventespresso/ui-components';
import { useGlobalModal } from '@eventespresso/registry';
import { Repeat } from '@eventespresso/icons';
import { RemGlobalModals } from '../types';
import { EdtrGlobalModals } from '@eventespresso/edtr-services';

const RemButton: React.FC = () => {
	const { open: openRemModal } = useGlobalModal(RemGlobalModals.MAIN);
	const { close: closeNewDateModal } = useGlobalModal(EdtrGlobalModals.NEW_DATE);

	const onClick = useCallback(() => {
		closeNewDateModal();
		openRemModal();
	}, [closeNewDateModal, openRemModal]);

	return (
		<NewEntityOption
			className={'ee-new-entity-option__recurring-datetime'}
			description={__('Add multiple dates in bulk that follow a recurring pattern')}
			icon={Repeat}
			title={__('Recurring Dates')}
		>
			<Button buttonType='primary' onClick={onClick}>
				{__('Add Recurring Dates')}
			</Button>
		</NewEntityOption>
	);
};

export default RemButton;
