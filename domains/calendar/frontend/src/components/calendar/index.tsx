import React, { useState } from 'react';
import { Calendar as ReactCalendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

import Event from './event';
import CustomToolbar from './Toolbar';

import type { IEvent } from '../../lib/types';

const locales = {
	'en-US': enUS,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});
function Calendar(props) {
	const [events, setEvents] = useState<IEvent[] | null>([
		{
			className: '',
			allDay: false,
			color: '',
			venue: 'somewhere',
			description: '',
			end: new Date('2024-08-22T17:00:00'),
			eventType: '',
			event_days: 1,
			id: 22,
			start: new Date('2024-08-22T08:00:00'),
			textColor: '',
			title: 'Cyber Security Seminar',
			url: 'cyber-security-seminar/?datetime=7',
		},
		{
			className: '',
			allDay: false,
			color: 'yellow.700',
			venue: 'somewhere',
			description: '',
			end: new Date('2024-08-22T17:00:00'),
			eventType: '',
			event_days: 1,
			id: 22,
			start: new Date('2024-08-22T08:00:00'),
			textColor: '',
			title: 'Gala dinner',
			url: 'cyber-security-seminar/?datetime=7',
		},
		{
			allDay: false,
			className: '',
			color: 'orange.500',
			venue: 'Canada',
			description: '',
			end: new Date('2024-08-24T17:00:00'),
			eventType: '',
			event_days: 1,
			image: 'https://demo.myeventon.com/wp-content/uploads/2016/08/Screen-Shot-2022-07-05-at-1.48.47-PM.png',
			id: 22,
			start: new Date('2024-08-23T10:00:00'),
			textColor: '',
			title: 'Cyber Security Seminar',
			url: 'cyber-security-seminar/?datetime=7',
		},
	]);
	// useEffect(() => {
	// 	if (window.espressoCalendarData) {
	// 		const scriptTag = document.getElementById('espressoCalendarData');
	// 		console.log('script', scriptTag);
	// 		if (scriptTag) {
	// 			console.log(scriptTag?.espressoCalendarData);
	// 			// const calendarData = JSON.parse(scriptTag.textContent || '[]');
	// 			// console.log(calendarData);
	// 		}
	// 	}
	// }, []);

	return (
		<>
			<ReactCalendar
				localizer={localizer}
				events={events}
				style={{ height: 800 }}
				// views={['month']}
				startAccessor='start'
				endAccessor='end'
				components={{
					event: Event,
					toolbar: CustomToolbar,
				}}
				popup={true}
				showAllEvents={true}
				// tooltipAccessor={null}
			/>
		</>
	);
}

export default Calendar;
