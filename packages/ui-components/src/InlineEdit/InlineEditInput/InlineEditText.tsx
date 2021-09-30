import { useCallback } from 'react';

import { InlineEdit } from '@eventespresso/adapters';
import { withLabel } from '../../withLabel';
import Preview from './Preview';
import type { InlineEditProps } from './types';

import './style.scss';

export const InlineEditText: React.FC<InlineEditProps> = ({ className, lineCount, tag: as, ...props }) => {
	const preview = useCallback((previewProps) => <Preview {...previewProps} lineCount={lineCount} />, [lineCount]);

	return (
		<InlineEdit
			placeholder=''
			{...props}
			as={as}
			editableInputClassName='ee-inline-edit__input'
			inputClassName='ee-inline-edit__text'
			inputType='text'
			Preview={preview}
			previewClassName={className}
		/>
	);
};

export const InlineEditTextWithLabel = withLabel(InlineEditText);
