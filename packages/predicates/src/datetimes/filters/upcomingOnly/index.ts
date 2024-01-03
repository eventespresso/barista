import { isTBD, isUpcoming } from '../../index';
import type { DatetimeFilterFn } from '../types';

const upcomingOnly: DatetimeFilterFn = (dates) => dates.filter((date) => isUpcoming(date) || isTBD(date));

export default upcomingOnly;
