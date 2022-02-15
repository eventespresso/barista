import withClassName from '../withClassName';
import { IconProps } from '../types';

const MapMarker = (props: IconProps): JSX.Element => {
	return (
		<svg
			aria-hidden='true'
			height='1.8em'
			viewBox='0 1 24 24'
			width='1.8em'
			xmlns='https://www.w3.org/2000/svg'
			className='ee-svg--map-marker'
			{...props}
		>
			<path
				fillRule='evenodd'
				d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z'
			/>
		</svg>
	);
};

export default withClassName(MapMarker, 'map-marker');
