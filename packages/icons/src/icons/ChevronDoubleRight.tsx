import withClassName from '../withClassName';
import { IconProps } from '../types';

const ChevronDoubleRight = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			fill='currentColor'
			height='1em'
			width='1em'
			viewBox='-100 -100 500 500'
			className='ee-svg--chevron-double-right'
			{...props}
		>
			<path d='M310.607 154.391l-150-149.997c-5.857-5.858-15.355-5.858-21.213.001-5.857 5.858-5.857 15.355 0 21.213l139.393 139.39-139.393 139.396c-5.857 5.858-5.857 15.355 0 21.213C142.323 328.536 146.162 330 150 330s7.678-1.464 10.607-4.394l150-150.003a14.999 14.999 0 000-21.212z' />
			<path d='M195.001 164.996a15 15 0 00-4.394-10.607L40.606 4.393c-5.858-5.858-15.355-5.858-21.213.001-5.857 5.858-5.857 15.355.001 21.213l139.394 139.39L19.393 304.394c-5.857 5.858-5.857 15.355.001 21.213C22.322 328.536 26.161 330 30 330s7.678-1.464 10.607-4.394l150.001-150.004a15.001 15.001 0 004.393-10.606z' />
		</svg>
	);
};

export default withClassName(ChevronDoubleRight, 'chevron-double-right');
