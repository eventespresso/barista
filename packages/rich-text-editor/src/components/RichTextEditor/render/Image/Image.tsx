import { useCallback, useRef, useState } from 'react';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import { Tabbable } from 'reakit/Tabbable';
import { useToolbarState } from 'reakit/Toolbar';

import { useOnClickOutside } from '@eventespresso/hooks';

import { ImageProps, Alignment } from './types';
import { useEditorState } from '../../../../hooks';
import Toolbar from './Toolbar';

export const Image: React.FC<ImageProps> = ({ align, alt, block, contentState, height, src, width }) => {
	const wrapperRef = useRef<HTMLSpanElement>();
	const [showToolbar, setShowToolbar] = useState(false);
	const [editorState, setEditorState] = useEditorState();
	const toolbar = useToolbarState({ loop: true });

	const onMouseOver = useCallback(() => {
		if (!showToolbar) {
			setShowToolbar(true);
		}
	}, [showToolbar]);

	const onMouseOut = useCallback(() => {
		if (showToolbar) {
			setShowToolbar(false);
		}
	}, [showToolbar]);

	useOnClickOutside({
		ref: wrapperRef,
		handler: onMouseOut,
	});

	const setAlignment = useCallback(
		(alignment: Alignment) => {
			const entityKey = block.getEntityAt(0);
			contentState.mergeEntityData(entityKey, { alignment });
			setEditorState(EditorState.push(editorState, contentState, 'change-block-data'));

			// re-render
			wrapperRef.current.focus();
			toolbar.next();
			toolbar.previous();
		},
		[block, contentState, editorState, setEditorState, toolbar]
	);

	const className = classNames('ee-rich-text-editor--image', align && `ee-rich-text-editor--image-align-${align}`);

	return (
		<Tabbable as='span' className={className} onMouseOver={onMouseOver} role='group' ref={wrapperRef}>
			<span className='ee-rich-text-editor--image-wrapper'>
				<img src={src} alt={alt} height={height} width={width} />
			</span>
			{showToolbar && <Toolbar align={align} setAlignment={setAlignment} toolbar={toolbar} />}
		</Tabbable>
	);
};
