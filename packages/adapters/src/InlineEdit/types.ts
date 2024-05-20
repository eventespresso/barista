import type React from 'react';
import type * as Chakra from '@chakra-ui/react';

import type { CommonInputProps } from '../types';

export type InputType = 'heading' | 'number' | 'textarea' | 'text';

type CommonProps = Omit<CommonInputProps<HTMLInputElement>, 'onChange' | 'onChangeValue'>;

type ChakraProps = Partial<Chakra.EditableProps>;

export interface InlineEditProps extends ChakraProps, CommonProps {
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
