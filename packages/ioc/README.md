# IOC

EE IOC (Inversion of Control) package. This package works similar to [`@wordpress/hooks`](https://github.com/WordPress/gutenberg/tree/trunk/packages/hooks) package, the only difference being better TS types for the action and filter callbacks and to avoid mistakes in action and filter names.

## `Usage`

Create a type or interface for actions for a use-case, where key is the action name and value/definition is a tuple, representing the arguments for the callback. You can use [named/labeled tuples](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#labeled-tuple-elements) for better readability.

```ts
export type Actions = {
	some_action_name: [arg1: string, arg2: number];
	some_other_action_name: [inputDate: Date, format: string];
};
```

Similarly create a type for filters for a use-case.

```ts
export type Filters = {
	some_filter_name: [arg1: string, arg2: number];
	some_other_filter_name: [inputDate: Date, format: string];
};
```

Then use

```ts
import { getHooks } from '@eventespresso/ioc';

// pass the types created above
const hooks = getHooks<Actions, Filters>();
```

Now you can use the `hooks` var from above to safely add/remove actions and filters with the defined types above.

```ts
// Here the arguements passed to addAction are strongly typed.

hooks.addAction('some_other_action_name', (inputDate, format) => {});
```

![image](https://user-images.githubusercontent.com/18226415/140877239-53a62b17-8f72-49df-bf53-c2367235cafd.png)
