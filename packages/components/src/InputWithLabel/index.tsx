import React from 'react';

import { InputWithLabel as InputWithLabelAdapter } from '@eventespresso/adapters';
import './style.scss';

interface InputWithLabelProps {
	label: React.ReactNode;
	labelPosition: 'left' | 'right';
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({ children, label, labelPosition = 'right' }) => {
	const leftLabel = labelPosition === 'left' && label;
	const rightLabel = labelPosition === 'right' && label;

	return (
		<InputWithLabelAdapter className='ee-input-with-label' leftLabel={leftLabel} rightLabel={rightLabel}>
			{children}
		</InputWithLabelAdapter>
	);
};
