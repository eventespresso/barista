import withClassName from '../withClassName';
import { IconProps } from '../types';

const RotateCW = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			fill='currentColor'
			height='1.5em'
			viewBox='0 0 20 20'
			width='1.5em'
			className='ee-svg--rotate-cw'
			{...props}
		>
			<path d='M10 1.02c-5.1 0-8.75 4.04-8.75 9s3.65 9 8.75 9c3.2 0 6.02-1.59 7.68-3.99l-2.59-1.52c-1.1 1.5-2.86 2.51-4.84 2.51-3.3 0-6-2.79-6-6s2.7-6 6-6c1.97 0 3.72 1 4.82 2.49l-1.92 1.64 6.18 1.09V2.99L17.4 4.6a9.315 9.315 0 00-7.36-3.58z' />
		</svg>
	);
};

export default withClassName(RotateCW, 'rotate-cw');
