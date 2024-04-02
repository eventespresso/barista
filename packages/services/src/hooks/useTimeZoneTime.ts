import { useMemo, useCallback } from 'react';
import { path } from 'ramda';
import { parseISO, isValid } from 'date-fns';
import { format as formatTz, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import { useConfig } from '../context';

type DateFn = (date: Date | string | number) => Date;
type FormatDateFn = (date: Date, options?: Intl.DateTimeFormatOptions) => string;

export interface TimeZoneTime {
	formatDateForSite: FormatDateFn;
	formatDateForUser: FormatDateFn;
	formatForSite: (localDate: Date, formatStr: string) => string;
	formatUtcDateForSite: FormatDateFn;
	formatUtcDateForUser: FormatDateFn;
	siteTimeToUtc: DateFn;
	userTimeToUtc: DateFn;
	userToSiteTime: DateFn;
	utcToSiteTime: DateFn;
	utcToUserTime: DateFn;
}

const deafultOptions: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	hour12: true,
	timeZoneName: 'long',
};

const useTimeZoneTime = (): TimeZoneTime => {
	const config = useConfig();
	// locale and timezone for the site
	const siteLC = path<string>(['locale', 'site'], config);
	const siteTZ = path<string>(['timezone', 'name'], config);
	// locale and timezone for the user
	const userLC = path<string>(['locale', 'user'], config);
	const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

	/**
	 * returns a date string formatted using the site's locale and timezone
	 */
	const formatDateForSite: FormatDateFn = useCallback(
		(date, options) => {
			const dateObject = date instanceof Date ? date : parseISO(date);
			if (!isValid(dateObject)) {
				return null;
			}
			const formatOptions = { ...deafultOptions, ...options };
			return dateObject.toLocaleString(siteLC, { ...formatOptions, timeZone: siteTZ });
		},
		[siteLC, siteTZ]
	);

	/**
	 * returns a date string formatted using the user's locale and timezone
	 */
	const formatDateForUser: FormatDateFn = useCallback(
		(date, options) => {
			const dateObject = date instanceof Date ? date : parseISO(date);
			if (!isValid(dateObject)) {
				return null;
			}
			const formatOptions = { ...deafultOptions, ...options };
			return dateObject.toLocaleString(userLC, { ...formatOptions, timeZone: userTZ });
		},
		[userLC, userTZ]
	);

	/**
	 * returns a date string formatted using the site's locale but UTC timezone
	 */
	const formatUtcDateForSite: FormatDateFn = useCallback(
		(date, options) => {
			const dateObject = date instanceof Date ? date : parseISO(date);
			if (!isValid(dateObject)) {
				return null;
			}
			const formatOptions = { ...deafultOptions, ...options };
			return dateObject.toLocaleString(siteLC, { ...formatOptions, timeZone: 'UTC' });
		},
		[siteLC]
	);

	/**
	 * returns a date string formatted using the user's locale but UTC timezone
	 */
	const formatUtcDateForUser: FormatDateFn = useCallback(
		(date, options) => {
			const dateObject = date instanceof Date ? date : parseISO(date);
			if (!isValid(dateObject)) {
				return null;
			}
			const formatOptions = { ...deafultOptions, ...options };
			return dateObject.toLocaleString(userLC, { ...formatOptions, timeZone: 'UTC' });
		},
		[userLC]
	);

	const userToSiteTime: DateFn = useCallback(
		(localDate) => {
			// First convert the local date to UTC
			const utcDate = zonedTimeToUtc(localDate, userTZ);
			// Now convert the UTC date to site timezone
			return utcToZonedTime(utcDate, siteTZ);
		},
		[siteTZ, userTZ]
	);

	const userTimeToUtc: DateFn = useCallback(
		(date) => {
			return zonedTimeToUtc(date, userTZ);
		},
		[userTZ]
	);

	const utcToUserTime: DateFn = useCallback(
		(date) => {
			return utcToZonedTime(date, userTZ);
		},
		[userTZ]
	);

	const siteTimeToUtc: DateFn = useCallback(
		(date) => {
			return zonedTimeToUtc(date, siteTZ);
		},
		[siteTZ]
	);

	const utcToSiteTime: DateFn = useCallback(
		(date) => {
			return utcToZonedTime(date, siteTZ);
		},
		[siteTZ]
	);

	/**
	 * generates a string from local date for the given timezone, default to site timezone
	 */
	const formatForSite: TimeZoneTime['formatForSite'] = useCallback(
		(localDate, formatStr) => {
			// Convert the local date to UTC
			const utcDate = userTimeToUtc(localDate);
			// Now convert the UTC date to site timezone
			const zonedDate = utcToSiteTime(utcDate);
			return formatTz(zonedDate, formatStr, { timeZone: siteTZ });
		},
		[siteTZ, userTimeToUtc, utcToSiteTime]
	);

	return useMemo(
		() => ({
			formatDateForSite,
			formatDateForUser,
			formatForSite,
			formatUtcDateForSite,
			formatUtcDateForUser,
			siteTimeToUtc,
			userTimeToUtc,
			userToSiteTime,
			utcToSiteTime,
			utcToUserTime,
		}),
		[
			formatDateForSite,
			formatDateForUser,
			formatForSite,
			formatUtcDateForSite,
			formatUtcDateForUser,
			siteTimeToUtc,
			userTimeToUtc,
			userToSiteTime,
			utcToSiteTime,
			utcToUserTime,
		]
	);
};

export default useTimeZoneTime;
