import useRecurrenceQueryOptions from './useRecurrenceQueryOptions';
import type { Recurrence, RecurrenceEdge } from '../../types';
import { useMemoStringify } from '@eventespresso/utils';
import { getCacheIds } from '@eventespresso/predicates';
import { useRecurrencesQuery } from '@eventespresso/data';

const useRecurrences = (): Array<Recurrence> => {
	const options = useRecurrenceQueryOptions();
	const { data } = useRecurrencesQuery<RecurrenceEdge>(options);

	const nodes = data?.espressoRecurrences?.nodes || [];

	const cacheIds = getCacheIds(nodes);

	return useMemoStringify(nodes, cacheIds);
};

export default useRecurrences;
