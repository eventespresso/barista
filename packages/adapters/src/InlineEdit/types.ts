import type React from 'react';
import type { EditableProps as ChakraEditableProps } from '@chakra-ui/react';

import type { CommonInputProps } from '../types';

export type InputType = 'heading' | 'number' | 'textarea' | 'text';

export interface InlineEditProps
	extends Partial<ChakraEditableProps>,
		Omit<CommonInputProps<HTMLInputElement>, 'onChange' | 'onChangeValue'> {
	'data-testid'?: string;
	editableInputClassName?: string;
	inputClassName?: string;
	inputType?: InputType;
	lineCount?: number;
	Preview?: React.ComponentType<InlineEditPreviewProps>;
	previewClassName?: string;
	textAreaClassName?: string;
	tooltip?: string;
}

export interface InlineEditPreviewProps
	extends Partial<Omit<InlineEditProps, 'onCancel' | 'onChange' | 'onChangeValue' | 'onEdit' | 'onSubmit'>> {
	isEditing?: boolean;
	onRequestEdit?: VoidFunction;
	value?: string;
}

export interface InlineEditInputProps
	extends Pick<InlineEditProps, 'data-testid' | 'editableInputClassName' | 'inputType' | 'textAreaClassName'> {
	onCancel: VoidFunction;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}
