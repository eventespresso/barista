import { Select, TextInput } from '@eventespresso/ui-components';

import { useFactory } from '.';

import type { Type } from '.';

type Map = Type.Return;
type Props<K extends keyof Map> = Map[K]['Component']['Props'] & {
	_type: K; // underscore to avoid collission with html attribute
};

export function Factory<K extends keyof Map>(props: Props<K>) {
	if (IsSelectProps(props)) {
		const {
			value,
			handlers: { onBlur, onChange },
		} = useFactory<'Select'>(props);
		return <Select onBlur={props.onBlur} />;
	}

	if (IsInputTextProps(props)) {
		const {
			value,
			handlers: { onBlur, onChange },
		} = useFactory<'Text'>(props);
		return <TextInput />;
	}

	if (IsInputNumberProps(props)) {
		const {
			value,
			handlers: { onBlur, onChange },
		} = useFactory<'Number'>(props);
		return <TextInput onBlur={onBlur} />;
	}

	// TODO: copy default scenario from BaseField.tsx
	return <></>;

	// TODO: remove
	// switch (props._type) {
	// 	case 'Select':
	// 		return <Select value={value} onBlur={onBlur} />;
	// 	case 'Text':
	// 		return <TextInput onChange={(e) => {}} onChangeValue={(v, e) => {}} value={value.toLocaleString()} />;
	// 	case 'Number':
	// 		return <TextInput onChange={(e) => {}} onChangeValue={(v, e) => {}} value={value} />;
	// }
}

// TODO: refactor to a separate file!

function IsSelectProps(props: Props<keyof Map>): props is Map['Select']['Component']['Props'] & { _type: 'Select' } {
	return props._type === 'Select';
}

function IsInputTextProps(props: Props<keyof Map>): props is Map['Text']['Component']['Props'] & { _type: 'Text' } {
	return props._type === 'Text';
}

function IsInputNumberProps(
	props: Props<keyof Map>
): props is Map['Number']['Component']['Props'] & { _type: 'Number' } {
	return props._type === 'Number';
}
