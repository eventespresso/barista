import { InlineEditProps as InlineEditAdapterProps, InlineEditPreviewProps } from '@eventespresso/adapters';

export interface InlineEditProps extends Omit<InlineEditAdapterProps, 'inputType'> {
	['data-testid']?: string;
	lineCount?: number;
	tag?: React.ElementType;
	tooltip?: string;
}

export interface TextareaProps extends Omit<InlineEditProps, 'inputType'> {
	lineCount?: number;
	richTextContent?: boolean;
	tooltip?: string;
}

export interface PreviewProps extends Partial<InlineEditPreviewProps>, Pick<InlineEditProps, 'data-testid'> {
	className?: string;
	lineCount?: number;
	lineLength?: number;
	isEditing?: boolean;
	onRequestEdit?: VoidFunction;
	richTextContent?: boolean;
	tooltip?: string;
}
