import React, { useEffect, useMemo, useState } from 'react';
import { Calendar as ReactCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

import Event from './event';
import CustomToolbar from './Toolbar';
import { useCalendarSettings } from '../../lib/context/calendarSettingsContext';

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
	const { settings } = useCalendarSettings();
	const [events, setEvents] = useState<IEvent[] | null>(null);

	const views = useMemo(() => {
		const views = [];
		if (settings.monthView) views.push(Views.MONTH);
		if (settings.weekView) views.push(Views.WEEK);
		if (settings.dayView) views.push(Views.DAY);
		if (settings.agendaView) views.push(Views.AGENDA);
		return views;
	}, [settings]);

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
				views={views}
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
