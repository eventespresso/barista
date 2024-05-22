import type React from 'react';
import type * as Chakra from '@chakra-ui/react';
import type { EditableInputProps, EditablePreviewProps, UseEditableReturn } from '@chakra-ui/react';
import type { TooltipProps } from '../Tooltip';

export module Component {
	export type Props = {
		container?: Container.Props;
		preview?: PreviewProps;
		input?: Input.Props;
	};

	export module LegacyProps {
		/**
		 * @deprecated these are deprecated but to avoid HUGE amount of refactoring, legacy props will be used as an adapter between new and old types
		 */
		export type InlineEditProps = Chakra.EditableProps & {
			editableInputClassName?: string;
			inputClassName?: string;
			inputType?: InputType;
			lineCount?: number;
			Preview?: React.ComponentType<InlineEditPreviewProps>;
			previewClassName?: string;
			textAreaClassName?: string;
			tooltip?: string;
		};

		/**
		 * @deprecated these are deprecated but to avoid HUGE amount of refactoring, legacy props will be used as an adapter between new and old types
		 */
		export type InlineEditPreviewProps = Omit<
			InlineEditProps,
			'onCancel' | 'onChange' | 'onChangeValue' | 'onEdit' | 'onSubmit'
		> & {
			isEditing?: boolean;
			onRequestEdit?: () => void;
			value?: string;
		};

		/**
		 * @deprecated these are deprecated but to avoid HUGE amount of refactoring, legacy props will be used as an adapter between new and old types
		 */
		export type InlineEditInputProps = Pick<
			InlineEditProps,
			'editableInputClassName' | 'inputType' | 'textAreaClassName'
		> & {
			onCancel: () => void;
			setValue: React.Dispatch<React.SetStateAction<string>>;
		};

		type InputType = 'heading' | 'number' | 'textarea' | 'text';
	}

	type PreviewProps = Preview.Props & {
		component?: React.FunctionComponent<Preview.Props>;
	};
}

export module Container {
	export type Props = Chakra.EditableProps;
}

export module Preview {
	export type Props = EditablePreviewProps & {
		onRequestEdit?: () => void; // MAYBE: replace when using hook (?)
		isEditing?: UseEditableReturn['isEditing'];
		value?: UseEditableReturn['value'];
		tooltip?: TooltipProps['tooltip'];
	};
}

export module Input {
	export type Props = EditableInputProps & {
		onCancel?: UseEditableReturn['onCancel'];
		setValue?: React.Dispatch<React.SetStateAction<string>>;
		type?: 'heading' | 'number' | 'textarea' | 'text';
		// MAYBE: refactor
		className?: {
			input?: string;
			textArea?: string;
		};
	};
}
