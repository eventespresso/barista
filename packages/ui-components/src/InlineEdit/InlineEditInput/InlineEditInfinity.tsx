import { useCallback } from 'react';

import { isInfinite, parseInfinity } from '@eventespresso/utils';

import InlineEdit from './InlineEdit';
import InlineEditInfinityPreview from './InlineEditInfinityPreview';
import type { InlineEditProps } from './types';

import './style.scss';

export const InlineEditInfinity: React.FC<InlineEditProps> = ({ className, onChange, value, ...props }) => {
	const isInfinity = isInfinite(value);

	const onChangeHandler = useCallback<InlineEditProps['onChange']>(
		(val) => {
			const parsedValue = String(parseInfinity(val));
			if (typeof onChange === 'function') {
				onChange(parsedValue);
			}
		},
		[onChange]
	);

	return (
		<InlineEdit
			placeholder=''
			{...props}
			inputClassName='ee-inline-edit__infinity'
			inputType='number'
			onChange={onChangeHandler}
			Preview={InlineEditInfinityPreview}
			previewClassName={className}
			value={isInfinity ? '' : value}
		/>
	);
};
