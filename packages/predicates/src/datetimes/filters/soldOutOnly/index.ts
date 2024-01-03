import isSoldOut from '../../isSoldOut';

import type { DatetimeFilterFn } from '../types';

const soldOutOnly: DatetimeFilterFn = (dates) => dates.filter(isSoldOut);

export default soldOutOnly;
