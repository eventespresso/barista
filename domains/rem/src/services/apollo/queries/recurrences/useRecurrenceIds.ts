import type { EntityId } from '@eventespresso/constants';
import { getGuids } from '@eventespresso/predicates';
import { useMemoStringify } from '@eventespresso/utils';

import useRecurrences from './useRecurrences';

const useRecurrenceIds = (): Array<EntityId> => {
	const recurrences = useRecurrences();

	return useMemoStringify(getGuids(recurrences));
};

export default useRecurrenceIds;
