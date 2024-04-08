import { useCacheQuery } from '@eventespresso/data';
import useEventQueryOptions from './useEventQueryOptions';
import { useMemoStringify } from '@eventespresso/utils';
import { Event, EventData } from '@eventespresso/constants';

const useEvent = (): Event => {
	const options = useEventQueryOptions();

	const { data } = useCacheQuery<EventData>(options);

	return useMemoStringify(data?.espressoEvent);
};

export default useEvent;
