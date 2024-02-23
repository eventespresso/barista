import type { Datetime } from '@eventespresso/edtr-services';

import activeOnly from './activeOnly';
import activeUpcoming from './activeUpcoming';
import expiredOnly from './expiredOnly';
import nextActiveUpcomingOnly from './nextActiveUpcomingOnly';
import recentlyExpiredOnly from './recentlyExpiredOnly';
import soldOutOnly from './soldOutOnly';
import upcomingOnly from './upcomingOnly';
import { notTrashed, trashedOnly } from '../../common';

import type { DatesStatusFilter } from './types';
import { DatetimeStatusFilters } from './types';

/**
 * reduces dates array based on value of the "status" filter
 */
const statusFilter = ({ dates: entities, status = DatetimeStatusFilters.activeUpcoming }: DatesStatusFilter): Datetime[] => {
	const dates = notTrashed(entities);
	switch (status) {
		case DatetimeStatusFilters.activeOnly:
			return activeOnly(dates);
		case DatetimeStatusFilters.activeUpcoming:
			return activeUpcoming(dates);
		case DatetimeStatusFilters.all:
			return entities;
		case DatetimeStatusFilters.expiredOnly:
			return expiredOnly(dates);
		case DatetimeStatusFilters.nextActiveUpcomingOnly:
			return nextActiveUpcomingOnly(dates);
		case DatetimeStatusFilters.recentlyExpiredOnly:
			return recentlyExpiredOnly(dates);
		case DatetimeStatusFilters.soldOutOnly:
			return soldOutOnly(dates);
		case DatetimeStatusFilters.trashedOnly:
			return trashedOnly(entities);
		case DatetimeStatusFilters.upcomingOnly:
			return upcomingOnly(dates);
		default:
			return dates;
	}
};

export default statusFilter;
