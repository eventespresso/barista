import { isActive, isUpcoming } from '../../index';
import type { DatetimeFilterFn } from '../types';

const activeUpcoming: DatetimeFilterFn = (dates) => {
	return dates.filter((date) => isActive(date) || isUpcoming(date));
};

export default activeUpcoming;
