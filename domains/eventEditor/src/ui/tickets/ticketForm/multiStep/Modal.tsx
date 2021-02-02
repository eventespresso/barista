import { useEffect, useState } from 'react';

import { EntityEditModal } from '@eventespresso/ui-components';
import { EdtrGlobalModals, useEvent, useTicketItem } from '@eventespresso/edtr-services';
import { useGlobalModal } from '@eventespresso/registry';
import { __, sprintf } from '@eventespresso/i18n';
import { usePrevNext } from '@eventespresso/hooks';

import ContentBody from './ContentBody';

import type { ContentWrapperProps } from './types';
import type { EntityEditModalData } from '@edtrUI/types';
import FooterButtons from './FooterButtons';

const Modal: React.FC<ContentWrapperProps> = ({ onClose, ...props }) => {
	const { isOpen } = useGlobalModal<EntityEditModalData>(EdtrGlobalModals.EDIT_TICKET);
	const event = useEvent();
	const steps = usePrevNext();
	const [isPristine, setIsPristine] = useState(true);

	const { values } = props.form.getState();

	const ticket = useTicketItem({ id: values?.id });

	useEffect(() => {
		return props.form.subscribe(({ pristine }) => setIsPristine(pristine), { pristine: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let title = ticket?.dbId
		? sprintf(
				/* translators: %s ticket id */
				__('Edit ticket %s'),
				`#${ticket.dbId}`
		  )
		: __('New Ticket Details');

	// add event name to the title
	title = event?.name ? `${event.name}: ${title}` : title;

	const footerButtons = <FooterButtons steps={steps} />;

	return (
		<EntityEditModal
			isOpen={isOpen}
			footerContent={footerButtons}
			onClose={onClose}
			showAlertOnClose={!isPristine}
			title={title}
		>
			<ContentBody {...props} ticket={ticket} steps={steps} />
		</EntityEditModal>
	);
};

export default Modal;
