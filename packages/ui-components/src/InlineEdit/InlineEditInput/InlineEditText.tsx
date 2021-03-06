import { useCallback } from 'react';

import { InlineEdit } from '@eventespresso/adapters';
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
			inputClassName='ee-inline-edit__text'
			inputType='text'
			Preview={preview}
			previewClassName={className}
		/>
	);
};
