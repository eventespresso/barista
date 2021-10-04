import { useCallback, useEffect, useState } from 'react';
import { EditorState, Modifier, RichUtils } from 'draft-js';
import { getSelectionText, getEntityRange, getSelectionEntity } from 'draftjs-utils';

import { LinkItems, ToolbarControlProps } from '../../types';
import { useEditorState } from '../../../../../hooks';
import defaultComponent from './Component';

type URLData = { url?: string; title?: string; openInNewTab?: boolean };

const Link: React.FC<ToolbarControlProps<'link'>> = (props) => {
	const [editorState, setEditorState] = useEditorState();
	const [currentEntity, setCurrentEntity] = useState(editorState ? getSelectionEntity(editorState) : null);
	const [currentValues, setCurrentValues] = useState<URLData>({ url: '', title: '', openInNewTab: false });

	// update currently selected entity when cursor position changes
	useEffect(() => {
		setCurrentEntity(editorState ? getSelectionEntity(editorState) : null);
	}, [editorState]);

	const setSelectionValues = useCallback(() => {
		const contentState = editorState.getCurrentContent();

		if (currentEntity && contentState.getEntity(currentEntity).getType() === 'LINK') {
			const url = contentState.getEntity(currentEntity).getData().url;
			const openInNewTab = contentState.getEntity(currentEntity).getData().targetOption === '_blank';

			const entityRange = getEntityRange(editorState, currentEntity);
			const title = entityRange && entityRange.text;

			setCurrentValues({ url, title, openInNewTab });
		} else {
			setCurrentValues({ title: getSelectionText(editorState) });
		}
	}, [currentEntity, editorState]);

	// update currently selected entity details when cursor position changes
	useEffect(() => {
		setSelectionValues();
	}, [setSelectionValues]);

	const addLink = useCallback(
		({ url, title, openInNewTab }) => {
			let selection = editorState.getSelection();

			if (currentEntity) {
				const entityRange = getEntityRange(editorState, currentEntity);
				const isBackward = selection.getIsBackward();
				if (isBackward) {
					selection = selection.merge({
						anchorOffset: entityRange.end,
						focusOffset: entityRange.start,
					});
				} else {
					selection = selection.merge({
						anchorOffset: entityRange.start,
						focusOffset: entityRange.end,
					});
				}
			}
			const entityKey = editorState
				.getCurrentContent()
				.createEntity('LINK', 'MUTABLE', {
					url,
					targetOption: openInNewTab ? '_blank' : '_self',
				})
				.getLastCreatedEntityKey();

			let contentState = Modifier.replaceText(
				editorState.getCurrentContent(),
				selection,
				`${title}`,
				editorState.getCurrentInlineStyle(),
				entityKey
			);
			let newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

			// insert a blank space after url
			selection = newEditorState.getSelection().merge({
				anchorOffset: selection.get('anchorOffset') + title.length,
				focusOffset: selection.get('anchorOffset') + title.length,
			});
			newEditorState = EditorState.acceptSelection(newEditorState, selection);
			contentState = Modifier.insertText(
				newEditorState.getCurrentContent(),
				selection,
				' ',
				newEditorState.getCurrentInlineStyle(),
				undefined
			);
			setEditorState(EditorState.push(newEditorState, contentState, 'insert-characters'));
		},
		[currentEntity, editorState, setEditorState]
	);

	const removeLink = useCallback(() => {
		let selection = editorState.getSelection();
		if (currentEntity) {
			const entityRange = getEntityRange(editorState, currentEntity);
			const isBackward = selection.getIsBackward();
			if (isBackward) {
				selection = selection.merge({
					anchorOffset: entityRange.end,
					focusOffset: entityRange.start,
				});
			} else {
				selection = selection.merge({
					anchorOffset: entityRange.start,
					focusOffset: entityRange.end,
				});
			}
			setEditorState(RichUtils.toggleLink(editorState, selection, null));
		}
	}, [currentEntity, editorState, setEditorState]);

	const onChange = useCallback(
		(action: LinkItems, data: URLData) => {
			if (action === 'link') {
				addLink(data);
			} else {
				removeLink();
			}
		},
		[addLink, removeLink]
	);

	const Component = props.config.component || defaultComponent;
	return <Component {...props} currentValue={currentValues} onChange={onChange} />;
};

export default Link;
