import React from 'react';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';

import { EntityDbId } from '@eventespresso/data';
import { useEventId } from '@eventespresso/edtr-services';

import { Link } from '../../';

import './style.scss';

interface Props {
	adminUrl: string;
	dbId: EntityDbId;
	sold?: number;
	type: 'date' | 'ticket';
}

const EntityDetailsPanelSold: React.FC<Props> = ({ adminUrl, sold = 0, type, ...props }) => {
	const eventId = useEventId();
	const dbId = type === 'date' ? { datetime_id: props.dbId } : { ticket_id: props.dbId };

	const regListUrl = addQueryArgs(adminUrl, {
		event_id: eventId,
		_reg_status: 'RAP',
		return: 'edit',
		...{ dbId },
	});

	const tooltip = type === 'date' ? __('view sold for this date.') : __('view sold for this ticket.');

	return (
		<Link className='entity-sold' href={regListUrl} tooltip={tooltip}>
			{sold}
		</Link>
	);
};

export default React.memo(EntityDetailsPanelSold);
