import { EditorProps } from 'react-draft-wysiwyg';

export interface RichTextEditorProps extends Omit<EditorProps, 'onChange'> {
	className?: string;
	defaultValue?: string;
	isDisabled?: boolean;
	onChange?: (string: string) => void; // LATER: what kind of parameter name is 'string'?
	onChangeValue?: (string: string) => void; // LATER: what kind of parameter name is 'string'?
	placeholder?: string;
	value?: string;
}
