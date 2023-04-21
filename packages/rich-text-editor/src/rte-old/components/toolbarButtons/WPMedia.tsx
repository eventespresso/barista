import { useCallback, useEffect } from 'react';
import { AtomicBlockUtils } from 'draft-js';

import { __ } from '@eventespresso/i18n';
import { Image } from '@eventespresso/icons';

import { ToolbarButtonProps } from './types';

const wpMedia = window?.wp?.media?.({
	title: __('Select media'),
	button: {
		text: __('Select'),
	},
	multiple: false,
	library: {
		type: ['image'],
	},
});

const openMediaModal = () => wpMedia?.open?.();

type AddMediaArgs = {
	src: string;
	height: number;
	width: number;
	alt: string;
	type: string; // 'image', 'video' etc.
};

const WPMedia: React.FC<ToolbarButtonProps> = ({ onChange, editorState }) => {
	const addMedia = useCallback(
		({ src, height, width, alt, type }: AddMediaArgs) => {
			const entityData = { src, height, width, alt };

			const entityType = type?.toUpperCase();

			const entityKey = editorState
				.getCurrentContent()
				.createEntity(entityType, 'MUTABLE', entityData)
				.getLastCreatedEntityKey();

			const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState as any, entityKey, ' ');
			onChange(newEditorState as any);
		},
		[editorState, onChange]
	);

	const mediaHandler = useCallback(() => {
		const attachment = wpMedia?.state()?.get('selection')?.first()?.toJSON();

		const { alt, height, url, type, width } = attachment;

		addMedia({ alt, height, src: url, type, width });
	}, [addMedia]);

	useEffect(() => {
		// de-register the previous listener.
		wpMedia?.off('select', mediaHandler);

		wpMedia?.on('select', mediaHandler);

		return () => wpMedia?.off('select', mediaHandler);
	}, [mediaHandler]);

	return (
		<div className='rdw-image-wrapper'>
			<div
				aria-label={__('Add Media')}
				className='rdw-option-wrapper'
				onClick={openMediaModal}
				onKeyPress={console.log}
				role='button'
				tabIndex={0}
			>
				<Image />
			</div>
		</div>
	);
};

export default WPMedia;
