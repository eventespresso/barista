import { useCallback } from 'react';

import { EntityId, useLazyCacheQuery } from '@eventespresso/data';

import { GET_DATETIME } from './queries';
import type { Datetime, DatetimeItem } from '../../types';

type Callback = (id: EntityId) => Datetime;

const useLazyDatetime = (): Callback => {
	const getData = useLazyCacheQuery<DatetimeItem>();

	return useCallback<Callback>(
		(id) => {
			const data = getData({
				query: GET_DATETIME,
				variables: {
					id,
				},
			});
			return data?.espressoDatetime;
		},
		[getData]
	);
};

export default useLazyDatetime;
