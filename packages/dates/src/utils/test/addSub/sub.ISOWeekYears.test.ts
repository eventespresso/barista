import { sub } from '../../addSub';

describe('sub.ISOWeekYears', () => {
	it('subtracts the given number of ISO week-numbering years', () => {
		const result = sub('ISOWeekYears', new Date(2014, 8 /* Sep */, 1), 5);
		expect(result).toEqual(new Date(2009, 7 /* Aug */, 31));
	});

	it('accepts a timestamp', () => {
		const result = sub('ISOWeekYears', new Date(2014, 8 /* Sep */, 1).getTime(), 12);
		expect(result).toEqual(new Date(2002, 8 /* Sep */, 2));
	});

	it('converts a fractional number to an integer', () => {
		const result = sub('ISOWeekYears', new Date(2014, 8 /* Sep */, 1), 5.555);
		expect(result).toEqual(new Date(2009, 7 /* Aug */, 31));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 8 /* Sep */, 1);
		sub('ISOWeekYears', date, 12);
		expect(date).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('handles dates before 100 AD', () => {
		const initialDate = new Date(0);
		initialDate.setFullYear(15, 5 /* Jun */, 26);
		initialDate.setHours(0, 0, 0, 0);
		const expectedResult = new Date(0);
		expectedResult.setFullYear(10, 6 /* Jul */, 2);
		expectedResult.setHours(0, 0, 0, 0);
		const result = sub('ISOWeekYears', initialDate, 5);
		expect(result).toEqual(expectedResult);
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = sub('ISOWeekYears', new Date(NaN), 5);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = sub('ISOWeekYears', new Date(2014, 8 /* Sep */, 1), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
