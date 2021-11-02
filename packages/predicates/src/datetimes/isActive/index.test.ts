import { formatISO } from 'date-fns';

import { nodes as datetimes } from '@eventespresso/edtr-services/src/apollo/queries/datetimes/test/data';
import { add, sub } from '@eventespresso/dates';
import { NOW } from '@eventespresso/constants';
import isActive from './index';

describe('isActive', () => {
	it('should return the value of isActive flag by default regardless of the start and end date', () => {
		[true, false].forEach((value) => {
			datetimes.forEach((datetime) => {
				const newDatetime = { ...datetime, startDate: null, endDate: null, isActive: value };
				const result = isActive(newDatetime);
				expect(result).toBe(value);
			});
		});
	});

	it('should return `false` if startDate is in the future and ignoreFlag is true', () => {
		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, startDate: formatISO(add('days', NOW, 2)), isActive: true };
			const result = isActive(newDatetime, true);
			expect(result).toBe(false);
		});
	});

	it('should return `false` if endDate is in the past and ignoreFlag is true', () => {
		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, endDate: formatISO(sub('days', NOW, 2)), isActive: true };
			const result = isActive(newDatetime, true);
			expect(result).toBe(false);
		});
	});

	it('should return true if startDate is in the past and endDate is in future and ignoreFlag is true', () => {
		datetimes.forEach((datetime) => {
			const newDatetime = {
				...datetime,
				startDate: formatISO(sub('days', NOW, 3)),
				endDate: formatISO(add('days', NOW, 3)),
			};
			const result = isActive(newDatetime, true);
			expect(result).toBe(true);
		});
	});

	it('should return `false` for `null` and `undefined` for inActive flag', () => {
		[null, undefined].forEach((value) => {
			const result = isActive({ ...datetimes[0], isActive: value });
			expect(result).toBe(false);
		});
	});
});
