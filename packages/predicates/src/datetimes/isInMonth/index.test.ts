import { formatISO } from 'date-fns';

import { nodes as datetimes } from '@eventespresso/edtr-services/src/apollo/queries/datetimes/test/data';
import { add, sub } from '@eventespresso/dates';
import { NOW } from '@eventespresso/constants';
import isInMonth from './index';

describe('isInMonth', () => {
	it('should return `true` if startDate IS in current month', () => {
		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, startDate: formatISO(NOW) };
			const result = isInMonth(newDatetime, NOW.getMonth());
			expect(result).toBe(true);
		});
	});

	it('should return `false` if startDate IS NOT in current month', () => {
		datetimes.forEach((datetime) => {
			// Set start date in future
			let result = isInMonth({ ...datetime, startDate: formatISO(add('months', NOW, 2)) }, NOW.getMonth());
			expect(result).toBe(false);

			// Set start date in the past
			result = isInMonth({ ...datetime, startDate: formatISO(sub('months', NOW, 2)) }, NOW.getMonth());
			expect(result).toBe(false);
		});
	});

	it('should return `true` if startDate IS in the given month', () => {
		datetimes.forEach((datetime) => {
			// Set start date in future
			let result = isInMonth(
				{ ...datetime, startDate: formatISO(add('months', NOW, 3)) },
				add('months', NOW, 3).getMonth()
			);
			expect(result).toBe(true);

			// Set start date in the past
			result = isInMonth(
				{ ...datetime, startDate: formatISO(sub('months', NOW, 3)) },
				sub('months', NOW, 3).getMonth()
			);
			expect(result).toBe(true);
		});
	});

	it('should return `false` if startDate IS NOT in the given month', () => {
		datetimes.forEach((datetime) => {
			// Set start date in future
			let result = isInMonth({ ...datetime, startDate: formatISO(add('months', NOW, 3)) }, NOW.getMonth());
			expect(result).toBe(false);

			// Set start date in the past
			result = isInMonth({ ...datetime, startDate: formatISO(sub('months', NOW, 3)) }, NOW.getMonth());
			expect(result).toBe(false);
		});
	});

	it('should return `false` when startDate is `null` and `undefined`', () => {
		[null, undefined].forEach((value) => {
			const result = isInMonth({ ...datetimes[0], startDate: value }, 0);
			expect(result).toBe(false);
		});
	});
});
