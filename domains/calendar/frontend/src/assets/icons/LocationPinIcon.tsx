import React from 'react';

interface LocationPinIconProps {
	width?: number;
	height?: number;
	fill?: string;
}
export default function LocationPinIcon({ width = 20, height = 20, fill = '#ffffff' }: LocationPinIconProps) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512' width={`${width}`} height={`${height}`}>
			{/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
			<path
				fill={fill}
				d='M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z'
			/>
		</svg>
	);
}
