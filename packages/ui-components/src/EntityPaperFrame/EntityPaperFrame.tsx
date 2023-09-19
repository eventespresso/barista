import './style.css';
import { useMemo } from 'react';
import classNames from 'classnames';
import { __ } from '@eventespresso/i18n';
import { EntityIDs } from '../EntityIDs';
import type { Entity } from '@eventespresso/data';
import { isDatetime } from '@eventespresso/edtr-services';
import { useUtcISOToSiteDate } from '@eventespresso/services';

interface EntityPaperFrameProps {
	children: React.ReactNode;
	className?: string;
	entity: Entity;
}

/**
 * EntityPaperFrame
 * adds a styled frame that gives the appearance
 * of a piece of paper on a surface
 */
const EntityPaperFrame: React.FC<EntityPaperFrameProps> = ({ children, entity, ...props }) => {
	const className = classNames(props.className, 'ee-entity-paper-frame-wrapper');

	const ariaLabel: string = useMemo(() => getAriaLabel(entity), [entity]);

	const ariaDescription: string = useMemo(() => getAriaDescription(entity), [entity]);

	return (
		<div
			aria-label={ariaLabel}
			aria-description={ariaDescription}
			id={`ee-entity-paper-frame-${entity.id}`}
			className={className}
		>
			<EntityIDs dbid={entity.dbId} guid={entity.id} />

			<div className='ee-entity-paper-frame'>
				<div className='ee-entity-inner-wrapper'>{children}</div>
			</div>
		</div>
	);
};

const getAriaLabel = (entity: Entity): string => {
	if (!entity.__typename) {
		console.error(`Cannot determine aria label for entity ${entity.dbId} due to missing __typename`);
		return '';
	}

	if (isDatetime(entity)) {
		const toSiteDate = useUtcISOToSiteDate();
		const name = entity.name.length > 0 ? entity.name : 'datetime';
		const start = toSiteDate(entity.startDate);
		const end = toSiteDate(entity.endDate);
		return `${name} between ${start} and ${end}`;
	}

	return entity.__typename;
};

const getAriaDescription = (entity: Entity): string => {
	if (!entity.__typename) {
		console.error(`Cannot determine aria description for entity ${entity.dbId} due to missing __typename`);
		return '';
	}

	if (isDatetime(entity)) {
		const description = entity.description;
		if (description.length === 0) {
			return 'missing datetime description';
		}
		return description.trim();
	}

	return entity.__typename;
};

export default EntityPaperFrame;
