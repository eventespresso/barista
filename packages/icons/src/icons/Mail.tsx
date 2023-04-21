import withClassName from '../withClassName';
import { IconProps } from '../types';

const Mail = (props: IconProps): JSX.Element => {
	return (
		<svg
			className='ee-svg--mail'
			height='1.25em'
			width='1.25em'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fill='none'
				fillOpacity='0'
				stroke='currentColor'
				strokeLinecap='round'
				strokeWidth='1.5px'
				d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'
			/>
			<polyline
				fill='none'
				fillOpacity='0'
				stroke='currentColor'
				strokeLinecap='round'
				strokeWidth='1.5px'
				points='22,6 12,13 2,6'
			/>
		</svg>
	);
};

export default withClassName(Mail, 'mail');
