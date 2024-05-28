import type { Type, Props } from '.';

export const IsPropsType = {
	Component: {
		Select: ComponentSelect,
		Input: {
			Text: ComponentTextInput,
			Number: ComponentNumberInput,
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
