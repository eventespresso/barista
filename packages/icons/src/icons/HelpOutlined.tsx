import withClassName from '../withClassName';
import { IconProps } from '../types';

const HelpOutlined = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			className='ee-svg--help-outlined'
			fill='currentColor'
			focusable='false'
			height='1.5em'
			viewBox='3 3 18 18'
			width='1.5em'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path d='M12 4.75a7.25 7.25 0 100 14.5 7.25 7.25 0 000-14.5zM3.25 12a8.75 8.75 0 1117.5 0 8.75 8.75 0 01-17.5 0zM12 8.75a1.5 1.5 0 01.167 2.99c-.465.052-.917.44-.917 1.01V14h1.5v-.845A3 3 0 109 10.25h1.5a1.5 1.5 0 011.5-1.5zM11.25 15v1.5h1.5V15h-1.5z'></path>
		</svg>
	);
};

export default withClassName(HelpOutlined, 'help-outlined');