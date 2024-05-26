import type React from 'react';
import type * as Chakra from '@chakra-ui/react';
import type { EditableInputProps, EditablePreviewProps, UseEditableReturn } from '@chakra-ui/react';
import type { TooltipProps } from '../Tooltip';

export type InputType = 'heading' | 'number' | 'text' | 'textarea';

// LATER: once deprecation is done:
//   - remove 'LegacyComponent' in PreviewProps
//   - remove 'onRequestEdit' in Preview

export module Props {
	export type InlineEdit = {
		container?: Container;
		preview?: PreviewProps;
		input?: Input;
	};

	type PreviewProps = Preview & {
		Component?: React.FunctionComponent<Preview>;
		Legacy?: React.ComponentType<Legacy.InlineEditPreviewProps>;
	};

	export type Container = Chakra.EditableProps;

	export type Preview = EditablePreviewProps & {
		onRequestEdit?: () => void;
		isEditing?: UseEditableReturn['isEditing'];
		value?: UseEditableReturn['value'];
		tooltip?: TooltipProps['tooltip'];
	};

	export type Input = InputForText | InputForTextarea;

	type InputBase = EditableInputProps & {
		_type: string;
	};

	export type InputForText = InputBase & {
		_type: 'text';
	};

	export type InputForTextarea = InputBase & {
		_type: 'textarea';
		onCancel: UseEditableReturn['onCancel'];
		setValue: React.Dispatch<React.SetStateAction<string>>;
	};

	export module Legacy {
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
	}
}
