import * as Chakra from '@chakra-ui/react';
import { useCallback } from 'react';
import { createOnKeyDown } from './onKeyDown';

import { Component, Factory as FType, OnKeyDown } from './types';

const Factory = <T extends FType.InputType>(props: FType.Type<T>) => {
	const state = Chakra.useEditableState();

	switch (props._type) {
		case 'textarea':
			return <Textarea {...props} {...state} />;
		default:
			return <Text {...props} {...state} />;
	}
};

const Text: Component.Text = (props) => {
	return <Chakra.EditableInput {...props} />;
};

const Textarea: Component.Textarea = ({ setValue, onCancel, ...props }) => {
	const onKeyDown = useCallback<OnKeyDown.Event>(() => {
		return createOnKeyDown(setValue, onCancel);
	}, [setValue, onCancel]);
	return <Chakra.EditableInput as='textarea' onKeyDown={onKeyDown} {...props} />;
};

export const Input = Object.assign(Factory, {
	Text,
	Textarea,
});
