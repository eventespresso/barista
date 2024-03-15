import classNames from 'classnames';

import { Content, Row, Sidebar } from '../Container';
import { EntityPaperFrame } from '../EntityPaperFrame';
import type { EntityCardProps } from './types';
import './styles.scss';

const EntityCard: React.FC<EntityCardProps> = ({
	actionsMenu,
	details,
	entity,
	notice,
	reverse = false,
	sidebar,
	sidebarClass,
}) => {
	const sidebarClassName = classNames(sidebarClass, 'entity-card__sidebar');
	const beforeSidebar = (
		<Sidebar align={'wide'} before className={sidebarClassName}>
			{sidebar}
		</Sidebar>
	);
	const afterSidebar = <Sidebar className={'entity-card__menu'}>{actionsMenu}</Sidebar>;

	return (
		<EntityPaperFrame className='ee-entity-card-wrapper ee-entity-list-item' entity={entity} notice={notice}>
			<Row align={'wide'} className={'entity-card'}>
				{!reverse ? beforeSidebar : afterSidebar}
				<Content className={'entity-card__details-wrapper'}>
					<Content align={'wide'} className={'entity-card__details'}>
						{details}
					</Content>
				</Content>
				{!reverse ? afterSidebar : beforeSidebar}
			</Row>
		</EntityPaperFrame>
	);
};

export default EntityCard;
