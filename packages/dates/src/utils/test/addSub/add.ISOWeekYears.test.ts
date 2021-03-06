import { add } from '../../addSub';

describe('add.ISOWeekYears', () => {
	it('adds the given number of ISO week-numbering years', () => {
		const result = add('ISOWeekYears', new Date(2010, 6 /* Jul */, 2), 5);
		expect(result).toEqual(new Date(2015, 5 /* Jun */, 26));
	});

	it('accepts a timestamp', () => {
		const result = add('ISOWeekYears', new Date(2014, 8 /* Sep */, 1).getTime(), 12);
		expect(result).toEqual(new Date(2026, 7 /* Aug */, 31));
	});

	it('converts a fractional number to an integer', () => {
		const result = add('ISOWeekYears', new Date(2010, 6 /* Jul */, 2), 5.6);
		expect(result).toEqual(new Date(2015, 5 /* Jun */, 26));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 8 /* Sep */, 1);
		add('ISOWeekYears', date, 12);
		expect(date).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('handles dates before 100 AD', () => {
		const initialDate = new Date(0);
		initialDate.setFullYear(10, 6 /* Jul */, 2);
		initialDate.setHours(0, 0, 0, 0);
		const expectedResult = new Date(0);
		expectedResult.setFullYear(15, 5 /* Jun */, 26);
		expectedResult.setHours(0, 0, 0, 0);
		const result = add('ISOWeekYears', initialDate, 5);
		expect(result).toEqual(expectedResult);
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = add('ISOWeekYears', new Date(NaN), 5);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = add('ISOWeekYears', new Date(2010, 6 /* Jul */, 2), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
