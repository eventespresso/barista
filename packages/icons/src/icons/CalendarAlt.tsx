import withClassName from '../withClassName';
import { IconProps } from '../types';

const CalendarAlt = (props: IconProps): JSX.Element => {
	return (
		<svg
			viewBox='0 0 20 20'
			data-icon='calendar'
			fill='currentColor'
			aria-hidden='true'
			height='1.5em'
			width='1.5em'
			className='ee-svg--calendar-alt'
			{...props}
		>
			<path d='M15 4h3v15H2V4h3V3c0-.41.15-.76.44-1.06.29-.29.65-.44 1.06-.44s.77.15 1.06.44c.29.3.44.65.44 1.06v1h4V3c0-.41.15-.76.44-1.06.29-.29.65-.44 1.06-.44s.77.15 1.06.44c.29.3.44.65.44 1.06v1zM6 3v2.5a.491.491 0 00.5.5.491.491 0 00.5-.5V3c0-.14-.05-.26-.15-.35-.09-.1-.21-.15-.35-.15s-.26.05-.35.15c-.1.09-.15.21-.15.35zm7 0v2.5c0 .14.05.26.14.36.1.09.22.14.36.14s.26-.05.36-.14c.09-.1.14-.22.14-.36V3a.491.491 0 00-.5-.5.491.491 0 00-.5.5zm4 15V8H3v10h14zM7 9v2H5V9h2zm2 0h2v2H9V9zm4 2V9h2v2h-2zm-6 1v2H5v-2h2zm2 0h2v2H9v-2zm4 2v-2h2v2h-2zm-6 1v2H5v-2h2zm4 2H9v-2h2v2zm4 0h-2v-2h2v2z' />
		</svg>
	);
};

export default withClassName(CalendarAlt, 'calendar-alt');
