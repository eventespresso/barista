import { useCallback, useEffect, useState } from 'react';
import { EditorState, Modifier, RichUtils } from 'draft-js';
import { getSelectionInlineStyle } from 'draftjs-utils';

import { InlineItems, ToolbarControlProps } from '../../types';
import { useEditorState } from '../../../../../hooks';
import { changeStyleKeys } from '../../../../../utils';
import defaultComponent from './Component';

const Inline: React.FC<ToolbarControlProps<'inline'>> = (props) => {
	const [editorState, setEditorState] = useEditorState();

	// the inline styles applied to the text selection
	const [currentStyles, setCurrentStyles] = useState<Record<string, any>>(
		editorState ? changeStyleKeys(getSelectionInlineStyle(editorState)) : {}
	);

	// update current inline styles when cursor position changes
	useEffect(() => {
		if (editorState) {
			const newCurrentStyles = changeStyleKeys(getSelectionInlineStyle(editorState));
			setCurrentStyles(newCurrentStyles);
		}
	}, [editorState]);

	const toggleInlineStyle = useCallback(
		(style: InlineItems) => {
			const newStyle = style === 'monospace' ? 'CODE' : style.toUpperCase();
			let newState = RichUtils.toggleInlineStyle(editorState, newStyle);
			if (style === 'subscript' || style === 'superscript') {
				const removeStyle = style === 'subscript' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
				const contentState = Modifier.removeInlineStyle(
					newState.getCurrentContent(),
					newState.getSelection(),
					removeStyle
				);
				newState = EditorState.push(newState, contentState, 'change-inline-style');
			}
			if (newState) {
				setEditorState(newState);
			}
		},
		[editorState, setEditorState]
	);

	const Component = props.config.component || defaultComponent;

	return <Component {...props} currentValue={currentStyles} onChange={toggleInlineStyle} />;
};

export default Inline;
