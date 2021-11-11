import { useMemo } from 'react';

import { useCacheQuery, CacheQueryOptions } from '@eventespresso/data';
import { useMemoStringify } from '@eventespresso/hooks';
import type { EntityItemProps } from '@eventespresso/edtr-services';

import { GET_RECURRENCE } from './queries';
import type { Recurrence, RecurrenceItem } from '../../types';

const useRecurrenceItem = ({ id }: EntityItemProps): Recurrence => {
	const options = useMemo<CacheQueryOptions>(
		() => ({
			query: GET_RECURRENCE,
			variables: {
				id,
			},
			returnPartialData: true, // avoid console warnings if data not present
		}),
		[id]
	);
	const { data } = useCacheQuery<RecurrenceItem>(options);

	return useMemoStringify(data?.espressoRecurrence);
};

export default useRecurrenceItem;
