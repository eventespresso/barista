import {
	addDays,
	addHours,
	addISOWeekYears,
	addMilliseconds,
	addMinutes,
	addMonths,
	addQuarters,
	addSeconds,
	addWeeks,
	addYears,
	toDate,
} from 'date-fns';
import { IntervalType } from './types';

const addMapping = {
	days: addDays,
	hours: addHours,
	ISOWeekYears: addISOWeekYears,
	milliseconds: addMilliseconds,
	minutes: addMinutes,
	months: addMonths,
	quarters: addQuarters,
	seconds: addSeconds,
	weeks: addWeeks,
	years: addYears,
};

export const add = (interval: IntervalType, date: Date | number, amount: number): Date => {
	const func = addMapping[interval];
	return func(date, amount);
};

export const sub = (interval: IntervalType, dirtyDate: Date | number, dirtyAmount: number): Date => {
	const func = addMapping[interval];
	let amount = Number(dirtyAmount);
	amount = amount < 0 ? Math.ceil(amount) : Math.floor(amount);
	const date = toDate(dirtyDate);

	return func(date, -amount);
};
