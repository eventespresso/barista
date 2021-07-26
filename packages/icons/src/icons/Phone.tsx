import withClassName from '../withClassName';
import { IconProps } from '../types';

const Phone = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			className='ee-svg--phone'
			focusable='false'
			height='1.5em'
			role='img'
			viewBox='-100 -100 720 720'
			width='1.5em'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path d='M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z'></path>
		</svg>
	);
};

export default withClassName(Phone, 'phone');
