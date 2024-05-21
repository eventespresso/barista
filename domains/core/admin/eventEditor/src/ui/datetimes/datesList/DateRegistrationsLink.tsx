import { __ } from '@eventespresso/i18n';
import { RegistrationsLink, ItemCount } from '@eventespresso/ui-components';
import { useRegistrationsLink, useRelatedTickets } from '@eventespresso/edtr-services';
import type { Datetime } from '@eventespresso/edtr-services';

interface Props {
	datetime: Datetime;
}

export const DateRegistrationsLink: React.FC<Props> = ({ datetime }) => {
	const getRelatedTickets = useRelatedTickets();

	const tickets = getRelatedTickets({
		entity: 'datetimes',
		entityId: datetime.id,
	});

	let count = 0;
	for (const ticket of tickets) {
		count += ticket.registrationCount;
	}

	const regListUrl = useRegistrationsLink({ datetime_id: datetime.dbId });

	const countTitle = __('total registrations.');
	const tooltip = __('view ALL registrations for this date.');

	return (
		<ItemCount count={count} emphasizeZero={false} title={countTitle}>
			<RegistrationsLink href={regListUrl} tooltip={tooltip} />
		</ItemCount>
	);
};
