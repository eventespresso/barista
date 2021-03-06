import isActive from '../../isActive';
import isUpcoming from '../../isUpcoming';
import type { DatetimeFilterFn } from '../types';

const activeUpcoming: DatetimeFilterFn = (dates) => {
	return dates.filter((date) => isActive(date) || isUpcoming(date));
};

export default activeUpcoming;
