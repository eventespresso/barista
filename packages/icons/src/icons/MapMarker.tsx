import withClassName from '../withClassName';
import { IconProps } from '../types';

const MapMarker = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			className='ee-svg--mapMarker'
			focusable='false'
			height='1.8em'
			role='img'
			viewBox='0 1 24 24'
			width='1.8em'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
			></path>
		</svg>
	);
};

export default withClassName(MapMarker, 'mapMarker');
