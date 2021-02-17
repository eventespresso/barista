import type { Entity } from '@eventespresso/data';

import { IconButtonProps } from '../Button';

export interface EntityTemplateProps<E extends Entity> {
	className?: string;
	templates: Array<E>;
	addEntity: (entity: Partial<Entity>) => void;
	deleteEntity?: (entity: Partial<Entity>) => void;
	onAddNew?: VoidFunction;
}

export interface SimpleEntityRendererProps<E extends Entity> {
	deleteButtonProps?: IconButtonProps;
	editButtonProps?: IconButtonProps;
	entity: E;
	onDelete: (entity: Entity) => void;
	onEdit: (entity: Entity) => void;
}

export interface SimpleEntityListProps<E extends Entity> extends EntityTemplateProps<E> {
	entities: Array<E>;
	EntityRenderer: React.ComponentType<SimpleEntityRendererProps<E>>;
	ContentRenderer: React.ComponentType<SimpleEntityListContentProps<E>>;
}

export interface SimpleEntityListContainerProps<E extends Entity>
	extends SimpleEntityListContentProps<E>,
		Pick<SimpleEntityListProps<E>, 'ContentRenderer'> {
	isOpen?: boolean;
}

export interface SimpleEntityListContentProps<E extends Entity> {
	entity?: E;
	onClose: VoidFunction;
}
