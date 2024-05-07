import type { Type } from '.';

type Map = Type.Return;
type Props<K extends keyof Map> = Map[K]['Hook']['Props'] & {
	_type: K; // internal prop hence underscore
};
type Type<K extends keyof Map> = Map[K]['Hook']['Type'];

export function useFactory<K extends keyof Map>(props: Props<K>): Type<K> {
	throw new Error('TODO:');
}
