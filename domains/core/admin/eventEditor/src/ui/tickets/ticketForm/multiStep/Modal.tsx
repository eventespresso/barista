import { useMemo } from 'react';

import { EntityEditModal } from '@eventespresso/ee-components';
import { EdtrGlobalModals, useEvent, useTicketItem } from '@eventespresso/edtr-services';
import { useGlobalModal } from '@eventespresso/registry';
import { __, sprintf } from '@eventespresso/i18n';
import { usePrevNext } from '@eventespresso/hooks';
import { useIsPristine } from '@eventespresso/form';
import type { ModalProps } from '@eventespresso/adapters';

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
				/* translators: 1 ticket name, 2 ticket id */
				__('Edit ticket "%1$s" - %2$s'),
				ticket.name,
				`#${ticket.dbId}`
		  )
		: __('New Ticket Details');

	// add event name to the title
	title = event?.name ? `${event.name}: ${title}` : title;

	const footerButtons = <FooterButtons steps={steps} />;

	const ariaAttributes: ModalProps['ariaAttributes'] = useMemo(() => {
		const getAriaLabel = (): string => {
			if (!ticket || !ticket.name) {
				return __('modal for ticket');
			}
			/* translators: modal for ticket %s */
			return sprintf('modal for ticket %s', ticket.name);
		};
		return {
			modalContent: { 'aria-label': getAriaLabel() },
		};
	}, [ticket]);

	return (
		<EntityEditModal
			entityType='ticket'
			isOpen={isOpen}
			footerContent={footerButtons}
			onClose={onClose}
			showAlertOnClose={!isPristine}
			title={title}
			ariaAttributes={ariaAttributes}
		>
			<ModalBody {...props} steps={steps} />
		</EntityEditModal>
	);
};

export default Modal;
