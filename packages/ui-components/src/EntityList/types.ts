import type React from 'react';

import type { Entity } from '@eventespresso/data';
import type { EntityId } from '@eventespresso/constants';
import type { ResponsiveTableProps } from '../..';

export interface ListView {
	view?: 'card' | 'table';
}

export interface EntityCardListProps<E extends Entity> {
	EntityCard: React.ComponentType<EntityListItemProps<E>>;
	entityIds: Array<EntityId>;
}
/**
 * This common type can be used/extended by many UI components
 */
export interface EntityListItemProps<E extends Entity = Entity> {
	entity?: E;
	id?: EntityId;
}

export interface EntityTableProps extends Omit<ResponsiveTableProps, 'className'> {
	className?: string;
}

export interface EntityListProps {
	activeFilters?: React.ReactNode;
	afterHeading?: React.ReactNode;
	afterList?: React.ReactNode;
	className?: string;
	entityList: React.ReactNode;
	error?: boolean;
	filterBar?: React.ReactNode;
	footer?: React.ReactNode;
	headerText: string;
	id?: string;
	legend?: React.ReactNode;
	loading?: boolean;
	pagination?: React.ReactNode;
}
