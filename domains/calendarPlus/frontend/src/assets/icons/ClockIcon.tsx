import React from 'react';

interface ClockIconProps {
	width?: number;
	height?: number;
	fill?: string;
}
export default function ClockIcon({ width = 20, height = 20, fill = '#ffffff' }: ClockIconProps) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width={`${width}`} height={`${height}`}>
			{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
			<path
				fill={fill}
				d='M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z'
			/>
		</svg>
	);
}