import * as React from 'react';
import withEnhance from '../withEnhance';
import { IconProps } from '../types';

const SvgChevronLeft = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			className='chevron-left_svg__ee-svg'
			fill='currentColor'
			height='1.25em'
			width='1.25em'
			viewBox='0 0 511.999 511.999'
			{...props}
		>
			<path d='M172.548 256.005L388.82 39.729c9.089-9.089 9.089-23.824 0-32.912s-23.824-9.089-32.912.002L123.18 239.551a23.26 23.26 0 00-6.817 16.454 23.275 23.275 0 006.817 16.457l232.727 232.721c4.543 4.544 10.499 6.816 16.455 6.816s11.913-2.271 16.457-6.817c9.089-9.089 9.089-23.824 0-32.912L172.548 256.005z' />
		</svg>
	);
};

export default withEnhance(SvgChevronLeft);
