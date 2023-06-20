import BigNumber from 'bignumber.js';
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

interface modifiers {
	add: Record<DateFnKey, DateFn>;
	sub: Record<DateFnKey, DateFn>;
}

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

	let remainder = new BigNumber(value).modulo(1);

	const wholeFn = getDateFn(type, unit);

	const wholeDate = wholeFn(date, wholeValue);

	// there are no decimal points, just return integer
	if (remainder.eq(0)) return wholeDate;

	// there are decimal points, continue here

	let frDate = wholeDate;

	let frUnit = unit;

	do {
		const multiplier = getMultiplierForFraction(frUnit);

		const product = remainder.times(multiplier);

		const integer =
			frUnit !== 'milliseconds'
				? product.integerValue(BigNumber.ROUND_FLOOR).toNumber()
				: product.integerValue(BigNumber.ROUND_CEIL).toNumber();

		remainder = frUnit !== 'milliseconds' ? product.modulo(1) : new BigNumber(0);

		frUnit = getPreviousUnit(frUnit);

		const frFn = getDateFn(type, frUnit);

		frDate = frFn(frDate, integer);
	} while (!remainder.eq(0));

	return frDate;
};

const getMultiplierForFraction = (unit: DateFnKey): number => {
	// there is nothing smaller than milliseconds in JS
	if (unit === 'milliseconds') return 1;

	// there is 1,000 milliseconds in one second
	if (unit === 'seconds') return 1000;

	// there is 24 hours in 1 day
	if (unit === 'days') return 24;

	// there are 7 days in a week
	if (unit === 'weeks') return 7;

	// there 4 week in a month
	if (unit === 'months') return 4;

	// there are 3 months in a quarter
	if (unit === 'quarters') return 3;

	// there are 4 quarters in a year
	if (unit === 'years') return 4;

	// all other time units are sexagesimal or base 60
	return 60;
};

const getPreviousUnit = (unit: DateFnKey): DateFnKey => {
	// modifiers.add and modifiers.sub are symmetrical
	// https://stackoverflow.com/questions/52856496/typescript-object-keys-return-string
	const keys = Array.from(Object.keys(modifiers.add)) as DateFnKey[];
	const i = keys.findIndex((v) => v === unit);
	if (i === -1) return unit; // unit not found, keep unit as is
	if (i === 0) return unit; // smallest possible unit
	return keys[i - 1];
};

const getDateFn = (type: ShiftDateArgs['type'], unit: DateFnKey): DateFn => {
	const oKey: keyof modifiers = type === 'earlier' ? 'sub' : 'add';

	if (!(unit in modifiers[oKey])) throw new Error('Unexpected condition');

	const iKey = unit as keyof modifiers[keyof modifiers]; // inner key

	return modifiers[oKey][iKey];
};

export type { DateFn, DateFnKey, modifyDateProps };

export { modifyDate };
