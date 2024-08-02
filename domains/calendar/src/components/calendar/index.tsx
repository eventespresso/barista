import React, { useEffect, useState } from 'react';
import { Calendar as ReactCalendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

// import moment from 'moment';
import Event from './event';
import { Tooltip } from '@chakra-ui/react';

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
	const [events, setEvents] = useState([
		{
			allDay: false,
			className: '',
			color: '',
			venue: 'somewhere',
			description: '',
			end: new Date('2024-08-22T17:00:00'),
			eventType: '',
			event_days: 1,
			event_img_thumb: '',
			event_time:
				'<span class="time-display-block"><span class="event-start-time">8:00 am</span> - <span class="event-end-time">5:00 pm</span></span>',
			event_time_no_tags: '8:00 am - 5:00 pm',
			id: 22,
			iframe: false,
			show_tooltips: true,
			start: new Date('2024-08-22T08:00:00'),
			target_date: '2024-07-26',
			textColor: '',
			title: 'Cyber Security Seminar',
			tooltip:
				'<div class="qtip_info"><p class="time_cal_qtip">Event Time: <span class="event-start-time">8:00 am</span> - <span class="event-end-time">5:00 pm</span></p><a class="reg-now-btn" href="cyber-security-seminar/?datetime=7">View Details</a><div class="clear"></div></div>',
			tooltip_at: 'topcenter',
			tooltip_my: 'bottomcenter',
			tooltip_style: 'qtip-light qtip-shadow',
			url: 'cyber-security-seminar/?datetime=7',
		},
		{
			allDay: false,
			className: '',
			color: 'hsl(39deg 62.88% 47.26%)',
			venue: 'somewhere',
			description: '',
			end: new Date('2024-08-22T17:00:00'),
			eventType: '',
			event_days: 1,
			event_img_thumb: '',
			event_time:
				'<span class="time-display-block"><span class="event-start-time">8:00 am</span> - <span class="event-end-time">5:00 pm</span></span>',
			event_time_no_tags: '8:00 am - 5:00 pm',
			id: 22,
			iframe: false,
			show_tooltips: true,
			start: new Date('2024-08-22T08:00:00'),
			target_date: '2024-07-26',
			textColor: '',
			title: 'Gala dinner',
			tooltip:
				'<div class="qtip_info"><p class="time_cal_qtip">Event Time: <span class="event-start-time">8:00 am</span> - <span class="event-end-time">5:00 pm</span></p><a class="reg-now-btn" href="cyber-security-seminar/?datetime=7">View Details</a><div class="clear"></div></div>',
			tooltip_at: 'topcenter',
			tooltip_my: 'bottomcenter',
			tooltip_style: 'qtip-light qtip-shadow',
			url: 'cyber-security-seminar/?datetime=7',
		},
		{
			allDay: false,
			className: '',
			color: 'hsla(11, 100%, 62.2%, 1)',
			venue: 'Canada',
			description: '',
			end: new Date('2024-08-24T17:00:00'),
			eventType: '',
			event_days: 1,
			event_img_thumb: '',
			event_time:
				'<span class="time-display-block"><span class="event-start-time">8:00 am</span> - <span class="event-end-time">5:00 pm</span></span>',
			event_time_no_tags: '8:00 am - 5:00 pm',
			id: 22,
			iframe: false,
			show_tooltips: true,
			start: new Date('2024-08-23T10:00:00'),
			target_date: '2024-07-26',
			textColor: '',
			title: 'Cyber Security Seminar',
			tooltip:
				'<div class="qtip_info"><p class="time_cal_qtip">Event Time: <span class="event-start-time">8:00 am</span> - <span class="event-end-time">5:00 pm</span></p><a class="reg-now-btn" href="cyber-security-seminar/?datetime=7">View Details</a><div class="clear"></div></div>',
			tooltip_at: 'topcenter',
			tooltip_my: 'bottomcenter',
			tooltip_style: 'qtip-light qtip-shadow',
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
				views={['month']}
				startAccessor='start'
				endAccessor='end'
				components={{
					event: Event,
				}}
				popup={true}
				showAllEvents={true}
				tooltipAccessor={null}
			/>
		</>
	);
}

export default Calendar;
