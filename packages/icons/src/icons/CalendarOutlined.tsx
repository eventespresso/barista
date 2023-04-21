import withClassName from '../withClassName';
import { IconProps } from '../types';

const CalendarOutlined = (props: IconProps): JSX.Element => {
	return (
		<svg
			viewBox='60 80 900 900'
			data-icon='calendar'
			fill='currentColor'
			aria-hidden='true'
			height='1.5em'
			width='1.5em'
			className='ee-svg--calendar-outlined'
			{...props}
		>
			<path d='M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z' />
		</svg>
	);
};

export default withClassName(CalendarOutlined, 'calendar-outlined');
