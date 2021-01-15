import withClassName from '../withClassName';
import { IconProps } from '../types';

const SvgEditorUl = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			className='editor-ul_svg__ee-svg'
			fill='currentColor'
			height='1.25em'
			width='1.25em'
			viewBox='0 0 20 20'
			{...props}
		>
			<path d='M5.5 7C4.67 7 4 6.33 4 5.5 4 4.68 4.67 4 5.5 4 6.32 4 7 4.68 7 5.5 7 6.33 6.32 7 5.5 7zM8 5h9v1H8V5zm-2.5 7c-.83 0-1.5-.67-1.5-1.5C4 9.68 4.67 9 5.5 9c.82 0 1.5.68 1.5 1.5 0 .83-.68 1.5-1.5 1.5zM8 10h9v1H8v-1zm-2.5 7c-.83 0-1.5-.67-1.5-1.5 0-.82.67-1.5 1.5-1.5.82 0 1.5.68 1.5 1.5 0 .83-.68 1.5-1.5 1.5zM8 15h9v1H8v-1z' />
		</svg>
	);
};

export default withClassName(SvgEditorUl);
