import { InlineEditType as InlineEdit } from '@eventespresso/adapters';

export type InlineEditProps = InlineEdit.Component.Props & {
	tag?: React.ElementType;
};

export type TextareaProps = InlineEditProps & {
	richTextContent?: boolean;
};

export type PreviewProps = InlineEdit.Preview.Props & {
	className?: string;
	lineCount?: number;
	lineLength?: number;
	isEditing?: boolean;
	onRequestEdit?: VoidFunction;
	richTextContent?: boolean;
	tooltip?: string;
};
