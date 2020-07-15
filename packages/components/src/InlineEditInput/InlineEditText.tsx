import React from 'react';

import { Dotdotdot, InlineEdit, InlineEditPreviewProps, TextFit } from '@eventespresso/adapters';
import type { TextProps } from './types';

const Preview: React.FC<InlineEditPreviewProps> = ({ fitText, isEditing, onRequestEdit, value }) => {
	if (isEditing) {
		return null;
	}

	const textInput = (
		<span onClick={onRequestEdit} onKeyDown={onRequestEdit} role='button' tabIndex={0}>
			{value}
		</span>
	);

	if (value.length > 30) {
		return <Dotdotdot clamp={2}>{textInput}</Dotdotdot>;
	}

	if (fitText) {
		return (
			<TextFit
				max={24} // based on --ee-font-size-bigger: 1.5rem;
				min={18}
				mode='single'
			>
				{textInput}
			</TextFit>
		);
	}

	return textInput;
};

const InlineEditText: React.FC<TextProps> = ({ fitText = true, placeholder = '', tag: as, ...props }) => {
	return (
		<InlineEdit
			{...props}
			as={as}
			inputType='text'
			placeholder={placeholder}
			Preview={(previewProps) => <Preview {...previewProps} fitText={fitText} />}
		/>
	);
};

export default InlineEditText;
