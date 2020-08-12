import * as React from 'react';
import withEnhance from '../withEnhance';
import { IconProps } from '../types';

const SvgRem = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			className='rem_svg__ee-svg'
			data-icon='rem'
			fill='currentColor'
			height='1.25rem'
			viewBox='0 0 20 20'
			width='1.25rem'
			{...props}
		>
			<path d='M10 1.02c-5.1 0-8.75 4.04-8.75 9s3.65 9 8.75 9c3.2 0 6.02-1.59 7.68-3.99l-2.59-1.52c-1.1 1.5-2.86 2.51-4.84 2.51-3.3 0-6-2.79-6-6s2.7-6 6-6c1.97 0 3.72 1 4.82 2.49l-1.92 1.64 6.18 1.09V2.99L17.4 4.6a9.315 9.315 0 00-7.36-3.58z' />
		</svg>
	);
};

export default withEnhance(SvgRem);
