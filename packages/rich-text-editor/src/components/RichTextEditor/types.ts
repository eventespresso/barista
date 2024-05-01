import { Editor } from 'draft-js';
import { StateProviderProps } from '../../context';
import { ToolbarProps } from './Toolbar';

export interface RichTextEditorProps extends ToolbarProps, StateProviderProps {
	'aria-label'?: string; // LATER: should this be 'ariaLabel' instead?
	className?: string;
	enableEditMode?: boolean;
	isDisabled?: boolean;
}

export type DraftEditorProps = React.ComponentProps<typeof Editor>;
