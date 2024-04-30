import type { DateTimeFormatsProps } from '.';

export const DateTimeFormats = (formats: DateTimeFormatsProps): DateTimeFormatsProps => {
	const maybeDefault = {
		dateFormat: formats?.dateFormat || defaultDateFormat,
		timeFormat: formats?.timeFormat || defaultTimeFormat,
		dateTimeFormat: '',
	};

	return {
		...maybeDefault,
		dateTimeFormat: maybeDefault.dateFormat + ' ' + maybeDefault.timeFormat,
	};
};

const defaultDateFormat = 'YYYY-MM-DD';
const defaultTimeFormat = 'HH:mm:ss';
