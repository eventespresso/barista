import type { DateTimeFormatsProps } from './types';
import { defaultDateFormat, defaultTimeFormat } from './defaultDateTimeFormats';

export const DateTimeFormats = (formats?: Partial<Data.Part>): Data.Type => {
	const props: Data.Part = {
		...defaultFormat,
		...formats,
	};

	const dateTimeFormat = props.dateFormat + ' ' + props.timeFormat;

	return {
		...props,
		dateTimeFormat,
	};
};

module Data {
	export type Type = DateTimeFormatsProps;
	export type Part = Omit<Type, 'dateTimeFormat'>;
}

const defaultFormat: Data.Part = {
	dateFormat: defaultDateFormat,
	timeFormat: defaultTimeFormat,
};

DateTimeFormats({ dateFormat: 'string' });
