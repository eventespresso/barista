import { useMemo } from 'react';
import { EntityEditModal } from '@eventespresso/ee-components';
import { EdtrGlobalModals, useEvent, useDatetimeItem } from '@eventespresso/edtr-services';
import { useGlobalModal } from '@eventespresso/registry';
import { __, sprintf } from '@eventespresso/i18n';
import { usePrevNext } from '@eventespresso/hooks';
import { useIsPristine } from '@eventespresso/form';

import ModalBody from './ModalBody';
import FooterButtons from './FooterButtons';

import type { ContentWrapperProps } from './types';
import type { EntityEditModalData } from '@edtrUI/types';

const Modal: React.FC<ContentWrapperProps> = ({ onClose, ...props }) => {
	const { isOpen } = useGlobalModal<EntityEditModalData>(EdtrGlobalModals.EDIT_DATE);
	const event = useEvent();
	const steps = usePrevNext();
	const isPristine = useIsPristine();

	const { values } = props.form.getState();

	const datetime = useDatetimeItem({ id: values?.id });

	const title: string = useMemo(() => {
		const str = datetime?.dbId
			? sprintf(
					/* translators: %s datetime id */
					__('Edit datetime %s'),
					`#${datetime.dbId}`
			  )
			: __('New Datetime');
		// add event name to the title
		return event?.name ? `${event.name}: ${str}` : str;
	}, [datetime, event]);

	const footerButtons = <FooterButtons steps={steps} />;

	return (
		<EntityEditModal
			entityType='date'
			isOpen={isOpen}
			footerContent={footerButtons}
			onClose={onClose}
			showAlertOnClose={!isPristine}
			title={title}
		>
			<ModalBody {...props} steps={steps} />
		</EntityEditModal>
	);
};

export default Modal;
