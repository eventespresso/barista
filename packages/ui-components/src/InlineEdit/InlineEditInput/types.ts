import type * as Chakra from '@chakra-ui/react';
import { CommonInputProps } from '@eventespresso/adapters';

export type InlineEditProps = InlineEditAdapterProps &
	Partial<{
		tag: React.ElementType;
	}>;

export type TextareaProps = InlineEditProps &
	Partial<{
		richTextContent: boolean;
	}>;

export type PreviewProps = Partial<InlineEditPreviewProps> &
	Partial<{
		className: string;
		lineCount: number;
		lineLength: number;
		isEditing: boolean;
		onRequestEdit: VoidFunction;
		richTextContent: boolean;
		tooltip: string;
	}>;

interface InlineEditAdapterProps extends ChakraProps, CommonProps {
	editableInputClassName?: string;
	inputClassName?: string;
	lineCount?: number;
	Preview?: React.ComponentType<InlineEditPreviewProps>;
	previewClassName?: string;
	textAreaClassName?: string;
	tooltip?: string;
}

type CommonProps = Omit<CommonInputProps<HTMLInputElement>, 'onChange' | 'onChangeValue'>;

type ChakraProps = Partial<Chakra.EditableProps>;

interface InlineEditPreviewProps extends InlineEditBase {
	isEditing?: boolean;
	onRequestEdit?: () => void;
	value?: string;
}

type InlineEditBase = Partial<
	Omit<InlineEditAdapterProps, 'onCancel' | 'onChange' | 'onChangeValue' | 'onEdit' | 'onSubmit'>
>;
