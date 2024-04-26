import type { Datetime } from '@eventespresso/edtr-services';

import aboveCapacity from './aboveCapacity';
import belowCapacity from './belowCapacity';

import { DatetimeSales } from '.';
import type { DatesSalesFilter } from '.';

/**
 * reduces dates array based on value of the "sales" filter
 */
const salesFilter = ({ dates, sales = DatetimeSales.all }: DatesSalesFilter): Datetime[] => {
	switch (sales) {
		case DatetimeSales.above50Capacity:
			return aboveCapacity({ dates, capacity: 50 });
		case DatetimeSales.above75Capacity:
			return aboveCapacity({ dates, capacity: 75 });
		case DatetimeSales.above90Capacity:
			return aboveCapacity({ dates, capacity: 90 });
		case DatetimeSales.below50Capacity:
			return belowCapacity({ dates, capacity: 50 });
		default:
			return dates;
	}
};

export default salesFilter;
