import { __ } from '@eventespresso/i18n';
import { RegistrationsLink, ItemCount } from '@eventespresso/ui-components';
import { useRegistrationsLink } from '@eventespresso/edtr-services';
import type { Ticket } from '@eventespresso/edtr-services';

interface Props {
	ticket: Ticket;
}

export const TicketRegistrationsLink: React.FC<Props> = ({ ticket }) => {
	const regListUrl = useRegistrationsLink({ ticket_id: ticket.dbId });

	const countTitle = __('total registrations.');
	const tooltip = __('view ALL registrations for this ticket.');

	return (
		<ItemCount count={ticket.registrationCount} emphasizeZero={false} title={countTitle}>
			<RegistrationsLink href={regListUrl} tooltip={tooltip} />
		</ItemCount>
	);
};
