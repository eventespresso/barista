import type { Field } from '.';

export module Node {
	export interface Interface {
		id: Field.UniqueId;
		databaseId: Field.DatabaseId;
		__typename: Field.Typename.Any;
	}
}
