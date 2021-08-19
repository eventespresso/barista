import withClassName from '../withClassName';
import { IconProps } from '../types';

const Repeat = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			fill='currentColor'
			height='1.5em'
			viewBox='2 2 16 16'
			width='1.5em'
			className='ee-svg--repeat'
			{...props}
		>
			<path d='M5 7v3l-2 1.5V5h11V3l4 3.01L14 9V7H5zm10 6v-3l2-1.5V15H6v2l-4-3.01L6 11v2h9z' />
		</svg>
	);
};

export default withClassName(Repeat, 'repeat');
