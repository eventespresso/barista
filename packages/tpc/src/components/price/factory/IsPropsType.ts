import type { Type, Props } from '.';

export const IsPropsType = {
	Component: {
		Select: ComponentSelect,
		Input: {
			Text: ComponentTextInput,
			Number: ComponentNumberInput,
		},
	},
	Hook: {
		Select: HookSelect,
		Input: {
			Text: HookTextInput,
			Number: HookNumberInput,
		},
	},
};

type Key = Type.Factory.Key; // alias

// C = component, alias
module C {
	export module Props {
		export type Any = Type.Factory.Component.Props<Key>;
		// G = generic, alias
		export type G<K extends Key> = Type.Factory.Component.Props<K>;
	}
}

function ComponentSelect(props: C.Props.Any): props is C.Props.G<'Select'> {
	return props._type === 'Select';
}

function ComponentTextInput(props: C.Props.Any): props is C.Props.G<'Text'> {
	return props._type === 'Text';
}

function ComponentNumberInput(props: C.Props.Any): props is C.Props.G<'Number'> {
	return props._type === 'Number';
}

// H = hook, alias
module H {
	export module Props {
		export type Any = Type.Factory.Hook.Props<Key>;
		// G = generic, alias
		export type G<K extends Key> = Type.Factory.Hook.Props<K>;
	}
}

function HookSelect(props: H.Props.Any): props is Props.Type & { _type: 'Select' } {
	return props._type === 'Select';
}

function HookTextInput(props: H.Props.Any): props is H.Props.G<'Text'> {
	return props._type === 'Text';
}

function HookNumberInput(props: H.Props.Any): props is H.Props.G<'Number'> {
	return props._type === 'Number';
}
