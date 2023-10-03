import withClassName from '../withClassName';
import { IconProps } from '../types';

const ChevronDoubleLeft = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			fill='currentColor'
			height='1em'
			width='1em'
			viewBox='-100 -100 500 500'
			className='ee-svg--chevron-double-left'
			{...props}
		>
			<path d='M51.213 165.004L190.607 25.607c5.857-5.858 5.857-15.355-.001-21.213-5.857-5.858-15.355-5.858-21.213.001l-150 150.004a14.995 14.995 0 00.001 21.212l150 149.996C172.322 328.536 176.161 330 180 330s7.678-1.464 10.607-4.394c5.857-5.858 5.857-15.355-.001-21.213L51.213 165.004z' />
			<path d='M171.213 165.004L310.607 25.607c5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213.001l-150 150.004a14.999 14.999 0 00.001 21.213l150 149.996A14.948 14.948 0 00300 330a14.95 14.95 0 0010.607-4.394c5.858-5.858 5.858-15.355 0-21.213L171.213 165.004z' />
		</svg>
	);
};

export default withClassName(ChevronDoubleLeft, 'chevron-double-left');
