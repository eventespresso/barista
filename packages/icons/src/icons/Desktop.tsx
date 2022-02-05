import withClassName from '../withClassName';
import { IconProps } from '../types';

const Desktop = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			fill='currentColor'
			height='1.5em'
			viewBox='0 0 16 16'
			width='1.5em'
			xmlns='http://www.w3.org/2000/svg'
			className='ee-svg--desktop'
			{...props}
		>
			<path
				fillRule='evenodd'
				d='M15 2H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5.34c-.25.61-.86 1.39-2.34 2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 9H1V3h14v8z'
			/>
		</svg>
	);
};

export default withClassName(Desktop, 'desktop');
