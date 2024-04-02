import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { useMemoStringify } from '@eventespresso/utils';
import { getCacheIds } from '@eventespresso/predicates';
import { useDatetimesQuery } from '@eventespresso/data';
import type { Datetime } from '@eventespresso/constants';
import type { DatetimeEdge } from '../../types';

const useDatetimes = (): Array<Datetime> => {
	const options = useDatetimeQueryOptions();
	const { data } = useDatetimesQuery<DatetimeEdge>(options);

	const nodes = data?.espressoDatetimes?.nodes || [];

	const cacheIds = getCacheIds(nodes);

	return useMemoStringify(nodes, cacheIds);
};

export default useDatetimes;
