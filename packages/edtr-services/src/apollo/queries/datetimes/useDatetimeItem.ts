import { useMemo } from 'react';
import { GET_DATETIME } from '../datetimes';
import type { Datetime, DatetimeItem } from '../../types';
import type { EntityItemProps } from '../types';
import { useCacheQuery, CacheQueryOptions } from '@eventespresso/data';

const useDatetimeItem = ({ id }: EntityItemProps): Datetime => {
	const options: CacheQueryOptions = {
		query: GET_DATETIME,
		variables: {
			id,
		},
	};
	const { data } = useCacheQuery<DatetimeItem>(options);
	const datetime = data?.datetime;

	return useMemo(() => datetime, [datetime]);
};

export default useDatetimeItem;
