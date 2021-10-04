import { format } from 'date-fns';
import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from '@eventespresso/constants';
import { getEEDOMData } from './DOMData';

/**
 * Format the date object using the website format settings
 */
export const formatDateTime =
	(formatStr?: string) =>
	async (date: Date): Promise<string> => {
		const formatString = formatStr || (await getDateTimeFormat());
		return format(date, formatString);
	};

export const getDateFormat = async (): Promise<string> => {
	const data = await getEEDOMData();

	return data?.config?.generalSettings?.dateFormat || DEFAULT_DATE_FORMAT;
};

export const getTimeFormat = async (): Promise<string> => {
	const data = await getEEDOMData();

	return data?.config?.generalSettings?.timeFormat || DEFAULT_TIME_FORMAT;
};

export const getDateTimeFormat = async (): Promise<string> => {
	const dateFormat = await getDateFormat();
	const timeFormat = await getTimeFormat();

	return `${dateFormat} ${timeFormat}`;
};
