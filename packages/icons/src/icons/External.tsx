import withClassName from '../withClassName';
import { IconProps } from '../types';

const External = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			fill='currentColor'
			height='1.5em'
			viewBox='0 -1 24 24'
			width='1.5em'
			xmlns='http://www.w3.org/2000/svg'
			className='ee-svg--external'
			{...props}
		>
			<path d='M18.2 17c0 .7-.6 1.2-1.2 1.2H7c-.7 0-1.2-.6-1.2-1.2V7c0-.7.6-1.2 1.2-1.2h3.2V4.2H7C5.5 4.2 4.2 5.5 4.2 7v10c0 1.5 1.2 2.8 2.8 2.8h10c1.5 0 2.8-1.2 2.8-2.8v-3.6h-1.5V17zM14.9 3v1.5h3.7l-6.4 6.4 1.1 1.1 6.4-6.4v3.7h1.5V3h-6.3z' />
		</svg>
	);
};

export default withClassName(External, 'external');
