import withClassName from '../withClassName';
import { IconProps } from '../types';

const Seat = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			className='ee-svg--seat'
			focusable='false'
			height='1.5em'
			role='img'
			viewBox='0 1 24 24'
			width='1.5em'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path d='M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z' />
		</svg>
	);
};

export default withClassName(Seat, 'seat');
