import type { Datetime } from '@eventespresso/constants';
import isRecentlyExpired from '../../isRecentlyExpired';
import type { DatetimeFilterFn } from '../types';

const recentlyExpiredOnly: DatetimeFilterFn = (dates) => {
	const filterFn = (date: Datetime): boolean => {
		return isRecentlyExpired(date) && !date.isTrashed;
	};

	return dates.filter(filterFn);
};

export default recentlyExpiredOnly;
