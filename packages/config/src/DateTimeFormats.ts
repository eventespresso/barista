import type { Type } from '.';

export const DateTimeFormats = (config?: Type.DateTimeFormats): Type.DateTimeFormats => {
	const date = config?.dateFormat ?? defaultsFormats.date;
	const time = config?.timeFormat ?? defaultsFormats.time;
	const format = config?.dateTimeFormat ?? date + ' ' + time;

	return {
		dateFormat: date,
		timeFormat: time,
		dateTimeFormat: format,
	};
};

const defaultsFormats = {
	date: 'YYYY-MM-DD',
	time: 'HH:mm:ss',
} as const;
