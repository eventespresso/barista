export interface AnyObject<T = any> {
	[key: string]: T;
}

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
