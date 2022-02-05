import withClassName from '../withClassName';
import { IconProps } from '../types';

const Phone = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			height='1.5em'
			viewBox='-100 -100 720 720'
			width='1.5em'
			xmlns='https://www.w3.org/2000/svg'
			className='ee-svg--phone'
			{...props}
		>
			<path d='M497.39 361.8l-112-48a24 24 0 00-28 6.9l-49.6 60.6A370.66 370.66 0 01130.6 204.11l60.6-49.6a23.94 23.94 0 006.9-28l-48-112A24.16 24.16 0 00122.6.61l-104 24A24 24 0 000 48c0 256.5 207.9 464 464 464a24 24 0 0023.4-18.6l24-104a24.29 24.29 0 00-14.01-27.6z' />
		</svg>
	);
};

export default withClassName(Phone, 'phone');
