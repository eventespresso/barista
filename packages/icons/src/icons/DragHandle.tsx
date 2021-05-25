import withClassName from '../withClassName';
import { IconProps } from '../types';

const SvgDragHandle = (props: IconProps): JSX.Element => {
	return (
		<svg
			color='currentColor'
			fill='currentColor'
			aria-hidden='true'
			height='1.25em'
			width='1.25em'
			viewBox='0 0 18 18'
			{...props}
		>
			<g fill='currentColor' stroke='currentColor' strokeWidth={2}>
				<path d='M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z' />
			</g>
		</svg>
	);
};

export default withClassName(SvgDragHandle, 'settings');
