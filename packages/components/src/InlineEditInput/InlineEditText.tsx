import React from 'react';

import { InlineEdit } from '@eventespresso/adapters';
import Preview from './Preview';
import type { TextProps } from './types';

const InlineEditText: React.FC<TextProps> = ({
	className,
	fitText = true,
	placeholder = '',
	tag: as,
	tooltip,
	...props
}) => {
	return (
		<InlineEdit
			{...props}
			as={as}
			className={className}
			inputType='text'
			placeholder={placeholder}
			Preview={(previewProps) => <Preview {...previewProps} fitText={fitText} tooltip={tooltip} />}
		/>
	);
};

export default InlineEditText;
