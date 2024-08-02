import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

interface CustomTooltipProps {
	content: React.ReactNode;
	children: React.ReactNode;
	placement?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<CustomTooltipProps> = ({ content, children, placement = 'top' }) => {
	const [isVisible, setIsVisible] = useState(false);

	const handleMouseEnter = () => setIsVisible(true);
	const handleMouseLeave = () => setIsVisible(false);

	return (
		<Box position='relative' display='inline-block' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			{children}
			{true && (
				<Box
					position='absolute'
					zIndex='tooltip'
					bg='black'
					color='white'
					p={2}
					borderRadius='md'
					whiteSpace='nowrap'
					fontSize='sm'
					transform='translateY(-100%)'
					// transition='opacity 0.2s'
					opacity={1}
					{...getTooltipPosition(placement)}
				>
					<Text>{content}</Text>
				</Box>
			)}
		</Box>
	);
};

// Helper function to position tooltip
const getTooltipPosition = (placement: 'top' | 'bottom' | 'left' | 'right') => {
	switch (placement) {
		case 'bottom':
			return { top: '100%', left: '50%', transform: 'translateX(-50%)' };
		case 'left':
			return { right: '100%', top: '50%', transform: 'translateY(-50%)' };
		case 'right':
			return { left: '100%', top: '50%', transform: 'translateY(-50%)' };
		default:
			return { bottom: '100%', left: '50%', transform: 'translateX(-50%)' }; // top
	}
};

export default Tooltip;
