import { useMemo } from 'react';
import classNames from 'classnames';

import { Content, Row, Sidebar } from '../Container';
import { EntityPaperFrame } from '../EntityPaperFrame';
import type { EntityCardProps } from './types';
import './styles.scss';

const EntityCard: React.FC<EntityCardProps> = ({
	actionsMenu,
	bg,
	details,
	entity,
	reverse = false,
	sidebar,
	sidebarClass,
}) => {
	const bgProps = useMemo(() => {
		return {
			backgroundImage: `url(${bg})`,
		};
	}, [bg]);

	const rowClassName = classNames('entity-card', bg && 'entity-card--image-bg');
	const sidebarClassName = classNames(sidebarClass, 'entity-card__sidebar');
	const beforeSidebar = (
		<Sidebar align={'wide'} before className={sidebarClassName}>
			{sidebar}
		</Sidebar>
	);
	const afterSidebar = <Sidebar className={'entity-card__menu'}>{actionsMenu}</Sidebar>;

	return (
		<EntityPaperFrame className='ee-entity-card-wrapper ee-entity-list-item' entity={entity}>
			<Row align={'wide'} className={rowClassName} style={bgProps}>
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
