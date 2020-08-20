import React from 'react';
import { __ } from '@wordpress/i18n';

import TicketRegistrationsLink from '../../TicketRegistrationsLink';
import { EntityDetailsPanel, EntityDetailsPanelSold } from '@eventespresso/components';
import TicketQuantity from './TicketQuantity';
import { getPropsAreEqual } from '@eventespresso/services';
import type { TicketItemProps } from '../types';

const TicketDetailsPanel: React.FC<TicketItemProps> = React.memo(({ adminUrl, entity: ticket, eventId }) => {
	const details = [
		{
			id: 'ee-ticket-sold',
			label: __('sold'),
			value: (
				<EntityDetailsPanelSold
					adminUrl={adminUrl}
					dbId={ticket.dbId}
					eventId={eventId}
					sold={ticket.sold}
					type='ticket'
				/>
			),
		},
		{
			id: 'ee-ticket-qty',
			label: __('quantity'),
			value: <TicketQuantity entity={ticket} />,
		},
		{
			id: 'ee-ticket-registrations',
			label: __('reg list'),
			value: <TicketRegistrationsLink ticket={ticket} />,
		},
	];

	return <EntityDetailsPanel details={details} className='ee-editor-ticket-details-sold-rsrvd-qty-div' />;
});

export default React.memo(TicketDetailsPanel, getPropsAreEqual(['entity', 'cacheId']));
