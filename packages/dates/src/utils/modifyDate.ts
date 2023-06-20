import {
	addDays,
	addHours,
	addMilliseconds,
	addMinutes,
	addMonths,
	addQuarters,
	addSeconds,
	addWeeks,
	addYears,
	subDays,
	subHours,
	subMilliseconds,
	subMinutes,
	subMonths,
	subQuarters,
	subSeconds,
	subWeeks,
	subYears,
} from 'date-fns';
import { IntervalType, ShiftDateArgs } from './types';

type DateFnKey = Exclude<IntervalType, 'ISOWeekYears'>;

type DateFn = (date: Date | number, amount: number) => Date;

type modifiers = {
	add: Record<DateFnKey, DateFn>;
	sub: Record<DateFnKey, DateFn>;
};

const modifiers: modifiers = {
	add: {
		milliseconds: addMilliseconds,
		seconds: addSeconds,
		minutes: addMinutes,
		hours: addHours,
		days: addDays,
		weeks: addWeeks,
		months: addMonths,
		quarters: addQuarters,
		years: addYears,
	},
	sub: {
		milliseconds: subMilliseconds,
		seconds: subSeconds,
		minutes: subMinutes,
		hours: subHours,
		days: subDays,
		weeks: subWeeks,
		months: subMonths,
		quarters: subQuarters,
		years: subYears,
	},
};

type modifyDateProps = { date: Date; unit: DateFnKey; value: number; type: 'earlier' | 'later' };

const modifyDate = ({ date, unit, value, type }: modifyDateProps): Date => {
	const wholeValue = Math.floor(value);

	const modulo = value % 1;

	const wholeFn = getDateFn(type, unit);

	const wholeDate = wholeFn(date, wholeValue);

	// there are no decimal points, just return integer
	if (modulo === 0) return wholeDate;

	// there are decimal points, continue here

	const multiplier = getMultiplerForFraction(unit);

	const frUnit = getPreviousUnit(unit);

	const frValue = Math.round(modulo * multiplier);

	const frFn = getDateFn(type, frUnit);

	return frFn(wholeDate, frValue);
};

const getMultiplerForFraction = (unit: IntervalType): number => {
	// milliseconds are smallest unit hence base is 1
	if (unit === 'milliseconds') return 1;

	// second fractions are milliseconds which have base of 1000
	if (unit === 'seconds') return 1000;

	// day is made of 24 hours hence base 24
	if (unit === 'days') return 24;

	// all other time units are sexagesimal or base 60
	return 60;
};

const getPreviousUnit = (unit: IntervalType): IntervalType => {
	// modifiers.add and modifiers.sub are symmetrical
	// https://stackoverflow.com/questions/52856496/typescript-object-keys-return-string
	const keys = Array.from(Object.keys(modifiers.add)) as IntervalType[];
	const i = keys.findIndex((v) => v === unit);
	if (i === -1) return unit; // unit not found, keep unit as is
	if (i === 0) return unit; // smallest possible unit
	return keys[i - 1];
};

const getDateFn = (type: ShiftDateArgs['type'], unit: IntervalType): DateFn => {
	const oKey: keyof modifiers = type === 'earlier' ? 'sub' : 'add';

	if (!(unit in modifiers[oKey])) throw new Error('Unexpected condition');

	const iKey = unit as keyof modifiers[keyof modifiers]; // inner key

	return modifiers[oKey][iKey];
};

export type { DateFn, DateFnKey, modifyDateProps };

export { modifyDate };
