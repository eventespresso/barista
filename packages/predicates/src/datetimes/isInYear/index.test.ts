import { formatISO } from 'date-fns';

import { nodes as datetimes } from '@eventespresso/edtr-services/src/apollo/queries/datetimes/test/data';
import { add, sub } from '@eventespresso/dates';
import { NOW } from '@eventespresso/constants';
import isInYear from './index';

describe('isInYear', () => {
	it('should return `true` if startDate IS in current year', () => {
		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, startDate: formatISO(NOW) };
			const result = isInYear(newDatetime, NOW.getFullYear());
			expect(result).toBe(true);
		});
	});

	it('should return `false` if startDate IS NOT in current year', () => {
		datetimes.forEach((datetime) => {
			// Set start date in future
			let result = isInYear({ ...datetime, startDate: formatISO(add('years', NOW, 2)) }, NOW.getFullYear());
			expect(result).toBe(false);

			// Set start date in the past
			result = isInYear({ ...datetime, startDate: formatISO(sub('years', NOW, 2)) }, NOW.getFullYear());
			expect(result).toBe(false);
		});
	});

	it('should return `true` if startDate IS in the given year', () => {
		datetimes.forEach((datetime) => {
			// Set start date in future
			let result = isInYear(
				{ ...datetime, startDate: formatISO(add('years', NOW, 3)) },
				add('years', NOW, 3).getFullYear()
			);
			expect(result).toBe(true);

			// Set start date in the past
			result = isInYear(
				{ ...datetime, startDate: formatISO(sub('years', NOW, 3)) },
				sub('years', NOW, 3).getFullYear()
			);
			expect(result).toBe(true);
		});
	});

	it('should return `false` if startDate IS NOT in the given year', () => {
		datetimes.forEach((datetime) => {
			// Set start date in future
			let result = isInYear({ ...datetime, startDate: formatISO(add('years', NOW, 3)) }, NOW.getFullYear());
			expect(result).toBe(false);

			// Set start date in the past
			result = isInYear({ ...datetime, startDate: formatISO(sub('years', NOW, 3)) }, NOW.getFullYear());
			expect(result).toBe(false);
		});
	});

	it('should return `false` when startDate is `null` and `undefined`', () => {
		[null, undefined].forEach((value) => {
			const result = isInYear({ ...datetimes[0], startDate: value }, 0);
			expect(result).toBe(false);
		});
	});
});
