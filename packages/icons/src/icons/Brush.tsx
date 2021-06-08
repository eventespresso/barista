import withClassName from '../withClassName';
import { IconProps } from '../types';

const Brush = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			height='1.25em'
			viewBox='0 0 24 24'
			width='1.25em'
			xmlns='http://www.w3.org/2000/svg'
			className='ee-svg--brush'
			{...props}
		>
			<path d='M4 20h8v-1.5H4V20zM18.9 3.5c-.6-.6-1.5-.6-2.1 0l-7.2 7.2c-.4-.1-.7 0-1.1.1-.5.2-1.5.7-1.9 2.2-.4 1.7-.8 2.2-1.1 2.7-.1.1-.2.3-.3.4l-.6 1.1H6c2 0 3.4-.4 4.7-1.4.8-.6 1.2-1.4 1.3-2.3 0-.3 0-.5-.1-.7L19 5.7c.5-.6.5-1.6-.1-2.2zM9.7 14.7c-.7.5-1.5.8-2.4 1 .2-.5.5-1.2.8-2.3.2-.6.4-1 .8-1.1.5-.1 1 .1 1.3.3.2.2.3.5.2.8 0 .3-.1.9-.7 1.3z' />
		</svg>
	);
};

export default withClassName(Brush, 'brush');
