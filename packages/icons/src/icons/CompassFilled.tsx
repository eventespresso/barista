import withEnhance from '../withEnhance';
import { IconProps } from '../types';

const SvgCompassFilled = (props: IconProps): JSX.Element => {
	return (
		<svg
			viewBox='64 64 896 896'
			className='compassFilled_svg__ee-svg'
			data-icon='compass'
			fill='currentColor'
			aria-hidden='true'
			height='1.25em'
			width='1.25em'
			{...props}
		>
			<path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zM327.3 702.4c-2 .9-4.4 0-5.3-2.1-.4-1-.4-2.2 0-3.2l98.7-225.5 132.1 132.1-225.5 98.7zm375.1-375.1l-98.7 225.5-132.1-132.1L697.1 322c2-.9 4.4 0 5.3 2.1.4 1 .4 2.1 0 3.2z' />
		</svg>
	);
};

export default withEnhance(SvgCompassFilled);
