import type { CSSProperties } from 'react';

import { useCallback } from '@wordpress/element';

export const useOnChangeStyle = <T extends { style?: CSSProperties }>(
	attributes: T,
	setAttributes: (attrs: Partial<T>) => void
) => {
	return useCallback(
		(key: keyof CSSProperties) => (value: any) => {
			const previousStyle = attributes.style || {};
			const newStyle: CSSProperties = { ...previousStyle, [key]: value };

			setAttributes({ style: newStyle } as T);
		},
		[attributes.style, setAttributes]
	);
};
