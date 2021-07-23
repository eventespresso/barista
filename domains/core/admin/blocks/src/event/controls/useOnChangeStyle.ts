import type { CSSProperties } from 'react';

import { useCallback } from '@wordpress/element';

export const useOnChangeStyle = <T extends Record<string, any>>(
	attributes: T,
	setAttributes: (attrs: Partial<T>) => void
) => {
	return useCallback(
		(key: keyof CSSProperties) => (value: any) => {
			const previousStyle = attributes.style || {};
			const newStyle = { ...previousStyle, [key]: value };

			setAttributes({ style: newStyle } as any);
		},
		[attributes.style, setAttributes]
	);
};
