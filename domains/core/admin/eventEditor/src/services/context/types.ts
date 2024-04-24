import type { EntityId } from '@eventespresso/constants';
import type { Entity } from '@eventespresso/data';
import type { EntityListFilterStateManager } from '@eventespresso/services';

type ELFSM = EntityListFilterStateManager<any>;

export interface EntityContextProps {
	id: EntityId;
}

export interface EntityListContextProps<FS extends ELFSM, E extends Entity> {
	filterState: FS;
	filteredEntities: Array<E>;
}
