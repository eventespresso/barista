export function formatEventTime(startStr, endStr) {
	const startDate = new Date(startStr);
	const endDate = new Date(endStr);

	const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

	const startTime = startDate.toLocaleTimeString([], options);
	const endTime = endDate.toLocaleTimeString([], options);

	return `${startTime} - ${endTime}`;
}
