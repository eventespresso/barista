import type { Field } from '.';

export module Node {
	export interface Interface<T extends Field.Typename.Any> {
		id: Field.UniqueId;
		databaseId: Field.DatabaseId;
		__typename: T;
	}

	export interface Trashable {
		isTrashable: boolean;
	}
}
