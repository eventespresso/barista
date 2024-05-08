import type { Type } from '.';

export const IsPropsType = {
	Select,
	Input: {
		Text: TextInput,
		Number: NumberInput,
	},
};

type Key = Type.Factory.Key; // alias
type Props = Type.Factory.Component.Props<Key>; // alias
type Return<K extends Key> = Type.Factory.Component.Props<K>; // alias

function Select(props: Props): props is Return<'Select'> {
	return props._type === 'Select';
}

function TextInput(props: Props): props is Return<'Text'> {
	return props._type === 'Text';
}

function NumberInput(props: Props): props is Return<'Number'> {
	return props._type === 'Number';
}
