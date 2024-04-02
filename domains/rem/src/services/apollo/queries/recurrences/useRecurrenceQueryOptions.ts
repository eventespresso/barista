import type { RecurrencesList, RecurrencesQueryArgs, CacheQueryOptions } from '@eventespresso/data';
import { useEventId } from '@eventespresso/edtr-services';
import { useMemoStringify } from '@eventespresso/utils';

import type { RecurrenceEdge } from '../../types';
import { GET_RECURRENCES } from '../recurrences';

export type RecurrencesQueryOptions = CacheQueryOptions<RecurrencesList<RecurrenceEdge>, RecurrencesQueryArgs>;

const useRecurrenceQueryOptions = (): RecurrencesQueryOptions => {
	const eventId = useEventId();

	const options: RecurrencesQueryOptions = {
		query: GET_RECURRENCES,
		variables: {
			where: {
				eventId,
			},
		},
	};

	return useMemoStringify(options);
};

export default useRecurrenceQueryOptions;
