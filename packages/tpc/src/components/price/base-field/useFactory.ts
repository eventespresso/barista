import type { Type } from '.';

type Key = Type.Factory.Key; // alias
type Props<K extends Key> = Type.Factory.Hook.Props<K>;
type Type<K extends Key> = Type.Factory.Hook.Type<K>;

export function useFactory<K extends Key>(props: Props<K>): Type<K> {
	throw new Error('TODO:');
}
