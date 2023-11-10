import type React from 'react';
import type {
	BodyRow,
	HeaderRow,
	LegendConfig,
	RowType,
	TableRow,
	DragAndDropProps,
} from '@eventespresso/ui-components';
import type { Entity, EntityId } from '@eventespresso/data';
import type { EntityListFilterStateManager } from '@eventespresso/services';
import type { TypeName } from '@eventespresso/services';

type ELFSM = EntityListFilterStateManager<any>;

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

export interface EntityListViewProps</* E extends Entity,  */ FS extends ELFSM> /* extends EntityListBaseProps<E>  */ {
	className?: string;
	filterState: FS;
}

interface BodyRowGeneratorFnProps<FS extends ELFSM> {
	entityId: EntityId;
	filterState: FS;
}
export type BodyRowGeneratorFn<FS extends ELFSM> = (props: BodyRowGeneratorFnProps<FS>) => BodyRow;
export type HeaderRowGeneratorFn<FS extends ELFSM> = (filerState: FS) => HeaderRow;

export interface EntityTableProps<FS extends ELFSM> extends EntityListViewProps</* E,  */ FS> {
	bodyRowGenerator: BodyRowGeneratorFn<FS>;
	domain: string;
	entityIds: Array<EntityId>;
	headerRowGenerator: HeaderRowGeneratorFn<FS>;
	listId: string;
	onSort?: DragAndDropProps['onDragEnd'];
	tableCaption?: string;
	tableId?: string;
}

export type EntityListComponent<FS extends ELFSM> = React.ComponentType<EntityListViewProps<FS>>;

export interface EntityListProps<FS extends ELFSM> extends EntityType, EntityListFilterBarProps<FS> {
	activeFilters?: React.ReactNode;
	footer: React.ReactNode;
	headerText: string;
	legendConfig: LegendConfig<string>;
	loadingText?: string;
	noResultsDesc?: string;
	noResultsTitle?: string;
	renderList?: () => React.ReactNode;
}

export type EntityTableFiltersHook = <D extends string, L extends string, FS extends ELFSM>(
	domain: D,
	listId: L
) => EntityTableFilters<FS>;

export interface EntityTableFilters<FS extends ELFSM> {
	applyFilters: (row: TableRow, filterState: FS, type: RowType, entityId?: EntityId) => TableRow;
}

export interface EntityListFilterBarProps<FS extends ELFSM> extends Partial<EntityListViewProps<FS>> {
	domain: string;
	listId?: string;
}

export interface EntityType {
	entityType: TypeName;
}
