import { formatISO } from 'date-fns';

import { add, sub } from '@eventespresso/dates';
import { NOW } from '@eventespresso/constants';

import inYearAndMonth from './index';
import { nodes as datetimes } from '@eventespresso/edtr-services/src/apollo/queries/datetimes/test/data';

const datetime = datetimes[1];

describe('nextActiveUpcomingOnly', () => {
	it('should return the dates in current year/month', () => {
		const datesInYearAndMonth = inYearAndMonth([NOW.getFullYear(), NOW.getMonth()]);
		const filteredDates = datesInYearAndMonth([
			{ ...datetime, id: 'abc', startDate: formatISO(NOW) },
			{ ...datetime, id: 'def', startDate: formatISO(add('years', NOW, 2)) },
			{ ...datetime, id: 'xyz', startDate: formatISO(NOW) },
		]);

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[1].id).toBe('xyz');
	});

	it('should return empty array if dates are not in current year/month', () => {
		const datesInYearAndMonth = inYearAndMonth([NOW.getFullYear(), NOW.getMonth()]);
		const filteredDates = datesInYearAndMonth([
			// keep the month same, but different year
			{ ...datetime, id: 'abc', startDate: formatISO(add('years', NOW, 2)) },
			{ ...datetime, id: 'def', startDate: formatISO(add('years', NOW, 2)) },
			// keep the year same, but different month
			{ ...datetime, id: 'xyz', startDate: formatISO(add('months', NOW, 2)) },
		]);

		expect(filteredDates).toEqual([]);
	});

	it('should return the dates in given year/month in future', () => {
		// use dates in future
		const date = add('years', NOW, 3);
		const datesInYearAndMonth = inYearAndMonth([date.getFullYear(), date.getMonth()]);

		const filteredDates = datesInYearAndMonth([
			{ ...datetime, id: 'abc', startDate: formatISO(date) },
			// add a date in past
			{ ...datetime, id: 'def', startDate: formatISO(sub('years', NOW, 2)) },
			// add a date in current month/year
			{ ...datetime, id: 'pqr', startDate: formatISO(NOW) },
			{ ...datetime, id: 'xyz', startDate: formatISO(date) },
		]);

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[1].id).toBe('xyz');
	});

	it('should return the dates in given year/month in past', () => {
		// use dates in past
		const date = sub('years', NOW, 3);
		const datesInYearAndMonth = inYearAndMonth([date.getFullYear(), date.getMonth()]);

		const filteredDates = datesInYearAndMonth([
			{ ...datetime, id: 'abc', startDate: formatISO(date) },
			// add a date in future
			{ ...datetime, id: 'def', startDate: formatISO(add('years', NOW, 2)) },
			// add a date in current month/year
			{ ...datetime, id: 'pqr', startDate: formatISO(NOW) },
			{ ...datetime, id: 'xyz', startDate: formatISO(date) },
		]);

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[1].id).toBe('xyz');
	});

	it('should return empty array if startDate is `null` or `undefined`', () => {
		const datesInYearAndMonth = inYearAndMonth([NOW.getFullYear(), NOW.getMonth()]);
		[null, undefined].forEach((startDate) => {
			const filteredDates = datesInYearAndMonth([
				// keep the month same, but different year
				{ ...datetime, id: 'abc', startDate },
				{ ...datetime, id: 'def', startDate },
				// keep the year same, but different month
				{ ...datetime, id: 'xyz', startDate },
			]);
			expect(filteredDates).toEqual([]);
		});
	});
});
