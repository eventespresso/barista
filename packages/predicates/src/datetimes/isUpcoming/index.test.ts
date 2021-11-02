import { formatISO } from 'date-fns';

import { nodes as datetimes } from '@eventespresso/edtr-services/src/apollo/queries/datetimes/test/data';
import { add, sub } from '@eventespresso/dates';
import { NOW } from '@eventespresso/constants';
import isUpcoming from './index';

describe('isUpcoming', () => {
	it('should return the value of isUpcoming flag by default regardless of the start date', () => {
		[true, false].forEach((value) => {
			datetimes.forEach((datetime) => {
				const newDatetime = { ...datetime, startDate: null, isUpcoming: value };
				const result = isUpcoming(newDatetime);
				expect(result).toBe(value);
			});
		});
	});

	it('should return `true` if startDate is in the future and ignoreFlag is true', () => {
		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, startDate: formatISO(add('days', NOW, 2)), isUpcoming: false };
			const result = isUpcoming(newDatetime, true);
			expect(result).toBe(true);
		});
	});

	it('should return `false` if startDate is in the past and ignoreFlag is true', () => {
		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, startDate: formatISO(sub('days', NOW, 2)), isUpcoming: true };
			const result = isUpcoming(newDatetime, true);
			expect(result).toBe(false);
		});
	});

	it('should return `false` for `null` and `undefined` for isUpcoming flag', () => {
		[null, undefined].forEach((value) => {
			const result = isUpcoming({ ...datetimes[0], isUpcoming: value });
			expect(result).toBe(false);
		});
	});
});
