import type { EntityId } from '@eventespresso/constants'

/**
 * It's an object with key as entity GUID
 * and value an object of key-value meta
 * {
 *     ticket-abc: {
 *         someMeta: 'Meta Value',
 *         someOtherMeta: 'Other Meta Value'
 *     },
 *     ticket-def: {
 *         someMeta: 'Meta Value',
 *     },
 * }
 */
export type EntityMetaMap = {
	[entityId: string]: {
		[metaKey: string]: any;
	};
};

export interface ManageEntityMeta {
	/**
	 * Get the value for a meta key for a given entity
	 */
	getMetaValue: <T>(entityId: EntityId, metaKey: string, defaultValue?: T) => T;

	/**
	 * Set the value for a meta key for a given entity
	 */
	setMetaValue: (entityId: EntityId, metaKey: string, metaValue: any) => void;

	/**
	 * Delete a meta for a given entity
	 */
	deleteMeta: (entityId: EntityId, metaKey: string) => void;

	/**
	 * Get the whole meta object for the given entity
	 */
	getEntityMeta: (entityId: EntityId) => EntityMetaMap[string];

	/**
	 * (Re)set the whole meta object for the given entity
	 */
	setEntityMeta: (entityId: EntityId, entityMeta: EntityMetaMap[string]) => void;

	/**
	 * Delete the whole meta object for the given entity
	 */
	deleteEntityMeta: (entityId: EntityId) => void;

	/**
	 * Get the whole meta object for all the entities
	 */
	getMetaMap: () => EntityMetaMap[string];

	/**
	 * (Re)set the whole meta object for all the entities
	 */
	resetMetaMap: (metaMap: EntityMetaMap) => void;

	/**
	 * Deep merges the given meta map with the current one.
	 */
	mergeMetaMap: (metaMap: EntityMetaMap) => void;
}
