import classNames from 'classnames';

import { shortenGuid } from '@eventespresso/utils';
import { EntityId, EntityDbId } from '@eventespresso/data';
import { isDev } from '@eventespresso/constants';

import './style.scss';

export enum EntityIdAlignment {
	LEFT = 'left',
	RIGHT = 'right',
}

export interface EntityIDsProps {
	align?: EntityIdAlignment;
	dbid: EntityDbId;
	guid: EntityId;
	notice?: JSX.Element | string;
}

export const EntityIDs: React.FC<EntityIDsProps> = ({ dbid, guid, align = 'left', notice }) => {
	const className = classNames('ee-entity-ids', {
		'ee-align-lft': align === EntityIdAlignment.LEFT,
		'ee-align-rgt': align === EntityIdAlignment.RIGHT,
	});

	const extraID = isDev && (
		<>
			<span className={'ee-entity-id-separator'}>{':'}</span>
			<span className={'ee-entity-guid'}>{shortenGuid(guid)}</span>
		</>
	);

	return (
		<div className={className}>
			<span className='ee-focus-priority-9'>
				<span className='ee-entity-dbid'>{dbid}</span>
				{extraID}
			</span>
			{notice}
		</div>
	);
};
