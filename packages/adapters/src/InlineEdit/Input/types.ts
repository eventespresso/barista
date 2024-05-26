import type React from 'react';
import type { EditableInputProps, UseEditableReturn } from '@chakra-ui/react';

export module Factory {
	export type Type<T extends Props.InputType> = T extends 'text' ? Text : T extends 'textarea' ? Textarea : never;

	export type InputType = Props.InputType;

	export type Text = Make<'text'>;

	export type Textarea = Make<
		'textarea',
		{
			onCancel: UseEditableReturn['onCancel'];
			setValue: React.Dispatch<React.SetStateAction<string>>;
		}
	>;

	type Make<T extends Props.InputType, O extends Record<any, any> = {}> = EditableInputProps &
		O & {
			_type: T;
		};
}

export module Props {
	export type Type<T extends InputType> = T extends 'text' ? Text : T extends 'textarea' ? Textarea : never;

	export type InputType = 'text' | 'textarea';

	export type Text = Make<Factory.Text>;
	export type Textarea = Make<Factory.Textarea>;

	type Make<T extends Record<any, any>> = Omit<T, '_type'>;
}

export module Component {
	export type Text = Type<'text'>;
	export type Textarea = Type<'textarea'>;

	type Type<T extends Props.InputType> = React.FC<Props.Type<T>>;
}

export module OnKeyDown {
	export type Event = React.KeyboardEventHandler<HTMLInputElement>;
	export type SetValue = Props.Textarea['setValue'];
	export type OnCancel = Props.Textarea['onCancel'];
}
