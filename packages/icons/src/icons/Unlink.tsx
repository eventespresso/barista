import withClassName from '../withClassName';
import { IconProps } from '../types';

const SvgUnlink = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			className='unlink_svg__dashicon unlink_svg__dashicons-editor-unlink unlink_svg__espresso-icon'
			height='1.25em'
			viewBox='0 0 20 20'
			width='1.25em'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path d='M17.74 2.26a4.321 4.321 0 010 6.1l-1.53 1.52c-.32.33-.69.58-1.08.77L13 10l1.69-1.64.76-.77.76-.76c.84-.84.84-2.2 0-3.04a2.13 2.13 0 00-3.04 0l-.77.76-.76.76L10 7l-.65-2.14c.19-.38.44-.75.77-1.07l1.52-1.53a4.321 4.321 0 016.1 0zM2 4l8 6-6-8zm4-2l4 8-2-8H6zM2 6l8 4-8-2V6zm7.36 7.69L10 13l.74 2.35-1.38 1.39a4.321 4.321 0 01-6.1 0 4.321 4.321 0 010-6.1l1.39-1.38L7 10l-.69.64-1.52 1.53c-.85.84-.85 2.2 0 3.04.84.85 2.2.85 3.04 0zM18 16l-8-6 6 8zm-4 2l-4-8 2 8h2zm4-4l-8-4 8 2v2z' />
		</svg>
	);
};

export default withClassName(SvgUnlink);
