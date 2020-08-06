import React from 'react';
import classNames from 'classnames';
import { shortenGuid } from '@eventespresso/services';
import { EntityId, EntityDbId } from '@eventespresso/data';

import './style.scss';

export enum EntityIdAlignment {
	LEFT = 'left',
	RIGHT = 'right',
}

export interface EntityIdProps {
	align?: EntityIdAlignment;
	dbid: EntityDbId;
	guid: EntityId;
}

const EntityIDs: React.FC<EntityIdProps> = React.memo(({ dbid, guid, align = 'left' }) => {
	const className = classNames('ee-entity-ids', 'ee-focus-priority-9', {
		'ee-align-lft': align === EntityIdAlignment.LEFT,
		'ee-align-rgt': align === EntityIdAlignment.RIGHT,
	});

	return (
		<div className={className}>
			<span className={'ee-entity-dbid'}>{dbid}</span>
			<span className={'ee-entity-id-separator'}>{':'}</span>
			<span className={'ee-entity-guid'}>{shortenGuid(guid)}</span>
		</div>
	);
});

export default EntityIDs;
