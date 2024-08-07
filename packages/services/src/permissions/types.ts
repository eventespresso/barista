import type { EntityId } from '@eventespresso/data';

// LATER: consolidate data types
export type Capability = string;

type EntityWithoutDefault = 'ticket' | 'price' | 'price_type';
type EntityWithDefault = `${'default_'}${EntityWithoutDefault}`;

export type SingularEntityType = 'datetime' | EntityWithoutDefault | EntityWithDefault;
export type PluralEntityType = `${SingularEntityType}s`;

export type EntityType = SingularEntityType | PluralEntityType;
export type Entity<E extends Record<'userId', EntityId>> = E;

export type CurrentUserCan = <E extends Record<'userId', EntityId>>(
	capability: 'read' | 'edit' | 'delete' | Capability,
	entityType?: EntityType,
	entity?: Entity<E>
) => boolean;

export type CurrentUserCanHOC = <E extends Record<'userId', EntityId>>(
	capability: 'read' | 'edit' | 'delete' | Capability,
	entityType?: EntityType,
	entity?: Entity<E>
) => <P extends Record<string, any>>(Component: React.FC<P>) => React.FC<P>;
