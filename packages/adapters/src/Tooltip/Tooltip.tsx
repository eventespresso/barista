import React from 'react';
import { Tooltip as ChakraTooltip } from '@chakra-ui/core';

import type { TooltipProps } from './types';

export const Tooltip: React.FC<TooltipProps> = ({ children, tooltip, ...props }) => {
	const ariaLabel = tooltip || props['aria-label'];

	return (
		<ChakraTooltip {...props} aria-label={ariaLabel} closeOnClick label={tooltip} hideDelay={250} showDelay={500}>
			{children && children}
		</ChakraTooltip>
	);
};
