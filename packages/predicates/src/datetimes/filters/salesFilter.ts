import type { Datetime } from '@eventespresso/edtr-services';

import aboveCapacity from './aboveCapacity';
import belowCapacity from './belowCapacity';

import type { DatesSalesFilter } from './types';
import { DatetimeSalesFilters } from './types';

/**
 * reduces dates array based on value of the "sales" filter
 */
const salesFilter = ({ dates, sales = DatetimeSalesFilters.all }: DatesSalesFilter): Datetime[] => {
	switch (sales) {
		case DatetimeSalesFilters.above50Capacity:
			return aboveCapacity({ dates, capacity: 50 });
		case DatetimeSalesFilters.above75Capacity:
			return aboveCapacity({ dates, capacity: 75 });
		case DatetimeSalesFilters.above90Capacity:
			return aboveCapacity({ dates, capacity: 90 });
		case DatetimeSalesFilters.below50Capacity:
			return belowCapacity({ dates, capacity: 50 });
		default:
			return dates;
	}
};

export default salesFilter;
