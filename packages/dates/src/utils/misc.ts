import { __ } from '@eventespresso/i18n';
import { getHours, getMinutes, getSeconds, parseISO, toDate } from 'date-fns';
import { setDate, setHours, setMinutes, setMonth, setSeconds, setYear } from 'date-fns/fp';
import { pipe } from 'ramda';

import type { OptionsType } from '@eventespresso/adapters';
import { NOW } from '@eventespresso/constants';
import { arrayOfN } from '@eventespresso/utils';

import { add, sub } from './addSub';
import diff from './diff';
import type { Intervals, PrepDatesComparisonFunc, ShiftDateArgs } from './types';

export const DATE_INTERVALS: Intervals = {
	months: __('month(s)'),
	weeks: __('week(s)'),
	days: __('day(s)'),
	hours: __('hour(s)'),
	minutes: __('minute(s)'),
};

export const intervalsToOptions = (intervals: Intervals, prependEmpty?: boolean): OptionsType => {
	const options = Object.entries(intervals).map(([value, label]) => ({ value, label }));

	if (prependEmpty) {
		return [{ label: '', value: '' }, ...options];
	}
	return options;
};

/**
 * Shifts the given date according to args.
 */
export const shiftDate =
	(args: ShiftDateArgs) =>
	(date: Date | string): Date => {
		const parsedDate = date instanceof Date ? date : parseISO(date);
		if (args?.unit && args?.value && args?.type) {
			const fn = args.type === 'earlier' ? sub : add;
			return fn(args.unit, parsedDate, args.value);
		}
		return parsedDate;
	};

/**
 * Sets the default time for a date based on `type`
 * Default time: 'start' => 8 am, 'end' => 5 pm
 */
export const setDefaultTime = (date: Date, type: 'start' | 'end' = 'start'): Date => {
	const hours = type === 'start' ? 8 : 17;
	return pipe(setHours(hours), setMinutes(0), setSeconds(0))(date);
};

/**
 * Sets the time of the date object to zero hour
 */
export const setTimeToZeroHour = (date: Date): Date => pipe(setHours(0), setMinutes(0), setSeconds(0))(date);

/**
 * Sets the time of the date object to 23:59:59
 */
export const setTimeToJustBeforeZeroHour = (date: Date): Date =>
	pipe(setHours(23), setMinutes(59), setSeconds(59))(date);

/**
 * Sets the time of the date object to noon
 */
export const setTimeToNoon = (date: Date): Date => pipe(setHours(12), setMinutes(0), setSeconds(0))(date);

/**
 * Sets the time of the date object to from the given time object
 */
export const setTimeFromDate =
	(time: Date) =>
	(date: Date): Date => {
		const hours = getHours(time);
		const minutes = getMinutes(time);
		const seconds = getSeconds(time);
		return pipe(setHours(hours), setMinutes(minutes), setSeconds(seconds))(date);
	};

/**
 * Sets the date, month and year of the date object to those of today
 */
export const setDateToToday = (date: Date): Date => {
	// prettier-ignore
	return pipe(
        setDate(NOW.getDate()),
        setMonth(NOW.getMonth()),
        setYear(NOW.getFullYear()
    ))(date);
};
/**
 *  accepts two Dates and/or timestamps, converts any timestamps to Dates,
 *  will set all time properties to 0 if considerTime is false (default)
 */
export const prepDatesForComparison: PrepDatesComparisonFunc = (firstDate, secondDate, considerTime = false) => {
	let parsedFirstDate = firstDate instanceof Date ? firstDate : toDate(firstDate);
	let parsedSecondDate = secondDate instanceof Date ? secondDate : toDate(secondDate);

	if (!considerTime) {
		parsedFirstDate = setTimeToZeroHour(parsedFirstDate);
		parsedSecondDate = setTimeToZeroHour(parsedSecondDate);
	}

	return [parsedFirstDate, parsedSecondDate];
};

type AdjustEndDateArgs = {
	newEndDate: Date;
	newStartDate: Date;
	prevEndDate: Date;
	prevStartDate: Date;
};

/**
 * utility function to see if end date needs to be adjusted
 * based upon the new start date
 */
export const mayBeAdjustEndDate = ({
	newEndDate,
	newStartDate,
	prevEndDate,
	prevStartDate,
}: AdjustEndDateArgs): Date => {
	const isStartDateAfterEndDate = newStartDate > newEndDate;

	if (isStartDateAfterEndDate) {
		// calculate the difference between previous start and end date in minutes.
		const difference = diff('minutes', prevEndDate, prevStartDate);
		// add the difference to end date
		return add('minutes', newStartDate, difference);
	}
	return newEndDate;
};

export const getMonthName = (date: Date, format: Intl.DateTimeFormatOptions['month'] = 'long'): string => {
	return date.toLocaleString('default', { month: format });
};

/**
 * Returns a localized list of days in a month from 1 to 31 as
 * an array of options for Select dropdown
 * [
 *     {
 *         value: '2',
 *         label: '2' // or '۲' etc.
 *     },
 *     ...
 * ]
 */
export const getDaysDropdownOptions = (format: Intl.DateTimeFormatOptions['day'] = 'numeric'): OptionsType => {
	// Create an array of 31 days and loop through it
	return arrayOfN(31).map((value) => {
		// make each a day for January to localize it
		const label = new Date(2021, 0, value).toLocaleString('default', { day: format });
		// `value` should be returned as is - non-localized, because it will be save to DB
		return { value, label };
	});
};

/**
 * Returns a localized list of months in a year from January to December
 * an array of options for Select dropdown
 * [
 *     {
 *         value: '1',
 *         label: 'January', // or 'يناير' etc.
 *     },
 *     ...
 * ]
 */
export const getMonthsDropdownOptions = (format: Intl.DateTimeFormatOptions['month'] = 'long'): OptionsType => {
	// Create an array of 12 months staring from 1 and loop through it
	return arrayOfN(12).map((value) => {
		// make each a day for January to localize it
		const label = new Date(2021, value - 1).toLocaleString('default', { month: format });
		// `value` should be returned as is - non-localized, because it will be save to DB
		return { value, label };
	});
};

/**
 * Configuration to generate year dropdown options
 * - Number of years generated will be determined by `totalCount`, if either `startYear` or `endYear` is missing
 * - `totalCount` will be ignored if both `startYear` or `endYear` are passed and former is less than later
 * - If `startYear` is 'current', years will be generated staring from the current year
 * - If `startYear` is a number (e.g. 2010), years will be generated staring from that
 * - If `endYear` is 'current', years will be generated with current year being the ending one
 * - If `endYear` is a number (e.g. 2025), years will be generated with that year being the ending one
 * - If none of `startYear` and `endYear` is passed, `startYear` will be set to 'current'
 */
type YearOptionsConfig = {
	/**
	 * Year to start from.
	 */
	startYear?: number | 'current';

	/**
	 * Year to end with.
	 */
	endYear?: number | 'current';

	/**
	 * Total number of years to show
	 * @default 20
	 */
	totalCount?: number;
	/**
	 * Year format
	 * @default 'numeric'
	 */
	format?: Intl.DateTimeFormatOptions['year'];
};

/**
 * Returns a localized list of months in a year from January to December
 * an array of options for Select dropdown
 * [
 *     {
 *         value: '2021',
 *         label: '2021', // or '۲۰۲۱' etc.
 *     },
 *     ...
 * ]
 */
export const getYearsDropdownOptions = (configuration?: YearOptionsConfig): OptionsType => {
	const config: YearOptionsConfig = { totalCount: 20, format: 'numeric', ...configuration };

	// If none of `startYear` and `endYear` is passed, set `startYear` to 'current'
	const startYear = !(config.startYear || config.endYear) ? 'current' : config.startYear;

	const startingYear = startYear === 'current' ? NOW.getFullYear() : startYear;
	let endingYear = config.endYear === 'current' ? NOW.getFullYear() : config.endYear;

	// if `startYear` is not less than `endYear`, discard `endYear`
	endingYear = startingYear && endingYear && startingYear > endingYear ? undefined : endingYear;

	let totalCount: number,
		startIndex: number,
		dir: Parameters<typeof arrayOfN>['2'] = 'positive';

	// if both `startYear` or `endYear` are passed, ignore `totalCount`
	if (startingYear && endingYear) {
		startIndex = startingYear;
		totalCount = endingYear - startingYear;
	} else if (startingYear && !endingYear) {
		// if `startYear` is passed but not `endYear`
		startIndex = startingYear;
		totalCount = config.totalCount;
	} else if (!startingYear && endingYear) {
		// if `endingYear` is passed but not `startingYear`
		startIndex = endingYear;
		totalCount = config.totalCount;
		dir = 'negative';
	}

	return arrayOfN(totalCount, startIndex, dir).map((value) => {
		const label = new Date(value, 0).toLocaleString('default', { year: config.format });
		// `value` should be returned as is - non-localized, because it will be save to DB
		return { value, label };
	});
};
