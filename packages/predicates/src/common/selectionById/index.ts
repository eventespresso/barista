import { filter, find, includes, prop, propEq } from 'ramda';

import type { Entity, EntityDbId, EntityId } from '@eventespresso/data';

// the following return specified entity prop
export const entityDbId = <T extends Entity>(entity: T): EntityDbId => prop('dbId', entity);
export const entityGuId = <T extends Entity>(entity: T): EntityId => prop('id', entity);

// the following return a function that:
// receives an entity and returns`true` if entity matches property supplied to predicate
export const entityHasDbId = <T extends Entity>(dbid: EntityDbId): ((entity: T) => boolean) => {
	return propEq('dbId', dbid);
};

export const entityHasGuid = <T extends Entity>(guid: EntityId): ((entity: T) => boolean) => {
	return propEq('id', guid);
};

// the following return a function that:
// returns the entity with specified property if found in array of entities supplied to predicate
export const findEntityByDbId =
	<T extends Entity>(entities: T[]) =>
	(dbid: EntityDbId): T | null =>
		find(entityHasDbId(dbid), entities) || null;

export const findEntityByGuid =
	<T extends Entity>(entities: T[]) =>
	(guid: EntityId): T | null =>
		find(entityHasGuid(guid), entities) || null;

// the following return a function that:
// returns an array of entities with specified property found in array of property values supplied to predicate
export const entitiesWithDbIdInArray = <T extends Entity>(entities: T[], dbidArray: EntityDbId[]): T[] => {
	if (dbidArray.length === 0) return [];
	return filter((entity: T) => includes(entityDbId(entity), dbidArray), entities);
};

export const entitiesWithGuIdInArray = <T extends Entity>(entities: T[], guidArray: EntityId[]): T[] => {
	if (guidArray.length === 0) return [];
	return filter((entity: T) => includes(entityGuId(entity), guidArray), entities);
};

export const entitiesWithGuIdNotInArray = <T extends Entity>(entities: T[], guidArray: EntityId[]): T[] => {
	if (guidArray.length === 0) return [];
	return filter((entity: T) => !includes(entityGuId(entity), guidArray), entities);
};
