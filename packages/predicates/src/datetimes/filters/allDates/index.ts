import { is } from 'ramda';
import type { Datetime } from '@eventespresso/constants';

import type { DatetimeFilterFn } from '../types';

const allDates: DatetimeFilterFn = (dates) => {
	const withoutTrashed = ({ isTrashed }: Datetime): boolean => {
		return is(Boolean, isTrashed) && !isTrashed;
	};

	return dates.filter(withoutTrashed);
};

export default allDates;
