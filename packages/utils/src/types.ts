export interface AnyObject<T = any> {
	[key: string]: T;
}

// TODO: move to package 'edtr-services'
export type KeysOfType<Obj, Type> = {
	[K in keyof Obj]: Obj[K] extends Type ? K : never;
}[keyof Obj];

// TODO: move to package 'predicates'
export type BoolField<F extends string> = Record<F, boolean>;

// TODO: move to package 'predicates'
export type EntityFieldPred<Field extends string, FieldType = any> = (entity: Record<Field, FieldType>) => boolean;

/**
 * Creates a dotted path of a nested object property
 *
 * type Test = {
 * 	foo: {
 * 		bar?: {
 * 			baz: string;
 * 		};
 * 		foo: number;
 * 	};
 * 	bar: number;
 * };
 *
 * type T = DeepKeyOf<Test>; // "bar" | "foo.foo" | "foo.bar.baz"
 */
// TODO: move to package 'form-builder'
export type PropsPath<T extends object> = {
	[P in keyof T]: T[P] extends object ? `${string & P}` | `${string & P}.${PropsPath<T[P]>}` : `${string & P}`;
}[T extends any[] ? number & keyof T : keyof T];
