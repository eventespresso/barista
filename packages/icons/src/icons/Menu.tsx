import withClassName from '../withClassName';
import { IconProps } from '../types';

const Menu = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			height='1.5em'
			viewBox='1 1 18 18'
			width='1.5em'
			xmlns='http://www.w3.org/2000/svg'
			className='ee-svg--menu'
			{...props}
		>
			<path d='M17 7V5H3v2h14zm0 4V9H3v2h14zm0 4v-2H3v2h14z' />
		</svg>
	);
};

export default withClassName(Menu, 'menu');
