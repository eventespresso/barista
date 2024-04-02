import { useCacheQuery } from '@eventespresso/data';
import useEventQueryOptions from './useEventQueryOptions';
import { useMemoStringify } from '@eventespresso/utils';

import type { Event, EventData } from '../../types';

const useEvent = (): Event => {
	const options = useEventQueryOptions();

	const { data } = useCacheQuery<EventData>(options);

	return useMemoStringify(data?.espressoEvent);
};

export default useEvent;
