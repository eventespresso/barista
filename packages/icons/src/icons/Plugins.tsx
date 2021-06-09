import withClassName from '../withClassName';
import { IconProps } from '../types';

const Plugins = (props: IconProps): JSX.Element => {
	return (
		<svg
			stroke='currentColor'
			fill='currentColor'
			strokeWidth='0'
			viewBox='3 3 18 18'
			height='1.25em'
			width='1.25em'
			className='ee-svg--plugins'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path d='M10.5 4v4h3V4H15v4h1.5a1 1 0 011 1v4l-3 4v2a1 1 0 01-1 1h-3a1 1 0 01-1-1v-2l-3-4V9a1 1 0 011-1H9V4h1.5zm.5 12.5v2h2v-2l3-4v-3H8v3l3 4z' />
		</svg>
	);
};

export default withClassName(Plugins, 'plugins');
