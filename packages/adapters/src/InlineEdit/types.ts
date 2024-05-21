import type React from 'react';
import type * as Chakra from '@chakra-ui/react';
import type { CommonInputProps } from '../types';

export type InputType = 'heading' | 'number' | 'textarea' | 'text';

// backwards compatibility prior to refactoring types
export type InlineEditProps = Props.InlineEdit;
export type InlineEditPreviewProps = Props.InlineEditPreview;
export type InlineEditInputProps = Props.InlineEditInput;

export module Props {
	export interface InlineEdit extends ChakraProps, CommonProps {
		editableInputClassName?: string;
		inputClassName?: string;
		inputType?: InputType;
		lineCount?: number;
		Preview?: React.ComponentType<InlineEditPreview>;
		previewClassName?: string;
		textAreaClassName?: string;
		tooltip?: string;
	}

	export interface InlineEditPreview extends InlineEditBase {
		isEditing?: boolean;
		onRequestEdit?: () => void;
		value?: string;
	}

	export interface InlineEditInput extends InlinePreviewBase {
		onCancel: () => void;
		setValue: React.Dispatch<React.SetStateAction<string>>;
	}

	type InlinePreviewBase = Pick<InlineEdit, 'editableInputClassName' | 'inputType' | 'textAreaClassName'>;

	type InlineEditBase = Partial<Omit<InlineEdit, 'onCancel' | 'onChange' | 'onChangeValue' | 'onEdit' | 'onSubmit'>>;

	type CommonProps = Omit<CommonInputProps<HTMLInputElement>, 'onChange' | 'onChangeValue'>;

	type ChakraProps = Partial<Chakra.EditableProps>;
}
