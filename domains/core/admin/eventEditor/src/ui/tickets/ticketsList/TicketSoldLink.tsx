import { __ } from '@eventespresso/i18n';
import { RegistrationsLink } from '@eventespresso/ui-components';
import { useRegistrationsLink, QueryURLRegStatus } from '@eventespresso/edtr-services';
import type { Ticket } from '@eventespresso/edtr-services';

interface Props {
	ticket: Ticket;
}

export const TicketSoldLink: React.FC<Props> = ({ ticket }) => {
	const regListUrl = useRegistrationsLink({ ticket_id: ticket.dbId, _reg_status: QueryURLRegStatus.APPROVED });

	const tooltip = __('view approved registrations for this ticket.');

	return (
		<RegistrationsLink href={regListUrl} tooltip={tooltip}>
			{ticket.sold}
		</RegistrationsLink>
	);
};
