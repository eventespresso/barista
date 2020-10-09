import React, { useMemo } from 'react';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@eventespresso/i18n';

import { ADMIN_ROUTES } from '@eventespresso/constants';
import { getAdminUrl, useEventId } from '@eventespresso/edtr-services';
import { useConfig } from '@eventespresso/services';
import { RegistrationsLink, ItemCount } from '@eventespresso/components';
import { Ticket } from '@eventespresso/edtr-services';

interface Props {
	ticket: Ticket;
}

const tooltipProps = { placement: 'top' as const };

const TicketRegistrationsLink: React.FC<Props> = ({ ticket }) => {
	const { siteUrl } = useConfig();

	const eventId = useEventId();

	const regListUrl = useMemo(() => {
		const adminUrl = getAdminUrl({
			adminSiteUrl: siteUrl.admin,
			page: ADMIN_ROUTES.REGISTRATIONS,
		});
		return addQueryArgs(adminUrl, {
			event_id: eventId,
			ticket_id: ticket.dbId,
			return: 'edit',
		});
	}, [eventId, siteUrl.admin, ticket.dbId]);

	const countTitle = __('total registrations.');
	const tooltip = __('view ALL registrations for this ticket.');

	return (
		<ItemCount count={ticket.registrationCount} title={countTitle} emphasizeZero={false}>
			<RegistrationsLink href={regListUrl} tooltip={tooltip} tooltipProps={tooltipProps} />
		</ItemCount>
	);
};

export default TicketRegistrationsLink;
