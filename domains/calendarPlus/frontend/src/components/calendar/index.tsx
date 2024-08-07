import React, { useEffect, useState } from 'react';
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
function Calendar() {
	const [events, setEvents] = useState<IEvent[] | null>(null);

	useEffect(() => {
		if (window.calendarPlusData) {
			const events = window.calendarPlusData.map((item) => ({
				...item,
				start: new Date(item.start),
				end: new Date(item.end),
			}));
			setEvents(events);
		}
	}, []);

	if (!events) return <></>;

	return (
		<>
			<ReactCalendar
				localizer={localizer}
				events={events}
				style={{ height: 800 }}
				// views={['month']}
				// startAccessor={(event) => {
				// 	return new Date(event.start);
				// }}
				// endAccessor={(event) => {
				// 	return new Date(event.end);
				// }}
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
