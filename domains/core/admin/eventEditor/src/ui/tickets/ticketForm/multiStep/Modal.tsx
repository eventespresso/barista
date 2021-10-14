import { EntityEditModal } from '@eventespresso/ee-components';
import { EdtrGlobalModals, useEvent, useTicketItem } from '@eventespresso/edtr-services';
import { useGlobalModal } from '@eventespresso/registry';
import { __, sprintf } from '@eventespresso/i18n';
import { usePrevNext } from '@eventespresso/hooks';
import { useIsPristine } from '@eventespresso/form';

import ModalBody from './ModalBody';
import type { ContentWrapperProps } from './types';
import type { EntityEditModalData } from '@edtrUI/types';
import FooterButtons from './FooterButtons';

const Modal: React.FC<ContentWrapperProps> = ({ onClose, ...props }) => {
	const { isOpen } = useGlobalModal<EntityEditModalData>(EdtrGlobalModals.EDIT_TICKET);
	const event = useEvent();
	const steps = usePrevNext();
	const isPristine = useIsPristine();

	const { values } = props.form.getState();

	const ticket = useTicketItem({ id: values?.id });

	let title = ticket?.dbId
		? sprintf(
				/* translators: %s ticket id */
				__('%1$s %2$s'),
				ticket.name,
				`#${ticket.dbId}`
		  )
		: __('New Ticket Details');

	// add event name to the title
	title = event?.name ? `${event.name}: ${title}` : title;

	const footerButtons = <FooterButtons steps={steps} />;

	return (
		<EntityEditModal
			entityType='ticket'
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
