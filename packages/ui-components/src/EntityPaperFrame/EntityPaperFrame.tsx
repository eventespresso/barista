import './style.scss';
import classNames from 'classnames';
import { EntityIDs } from '../EntityIDs';
import type { Entity } from '@eventespresso/data';
import { useContext } from 'react';
import Contexts from './Contexts';

interface EntityPaperFrameProps {
	children: React.ReactNode;
	className?: string;
	entity: Entity;
	notice?: JSX.Element | string;
}

/**
 * Composition of JSX and Contexts thanks to dot-notation
 * @link https://legacy.reactjs.org/docs/jsx-in-depth.html#using-dot-notation-for-jsx-type
 * @link https://stackoverflow.com/a/60883463/4343719
 * @link https://dev.to/alexandprivate/react-dot-notation-component-with-ts-49k8
 */
type Element = React.FC<EntityPaperFrameProps>;
type ElementWithCtx = Element & { Contexts: typeof Contexts };

/**
 * EntityPaperFrame
 * adds a styled frame that gives the appearance
 * of a piece of paper on a surface
 */
const EntityPaperFrame: ElementWithCtx = ({ children, entity, notice, ...props }) => {
	const className = classNames(props.className, 'ee-entity-paper-frame-wrapper');

	const ariaLabel = useContext(Contexts.AriaLabel);

	const ariaDescription = useContext(Contexts.AriaDescription);

	return (
		<div
			aria-label={ariaLabel}
			aria-description={ariaDescription}
			id={`ee-entity-paper-frame-${entity.id}`}
			className={className}
		>
			<EntityIDs dbid={entity.dbId} guid={entity.id} notice={notice} />

			<div className='ee-entity-paper-frame'>
				<div className='ee-entity-inner-wrapper'>{children}</div>
			</div>
		</div>
	);
};

EntityPaperFrame.Contexts = Contexts;

export default EntityPaperFrame;
