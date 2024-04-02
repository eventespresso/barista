import { useCallback } from 'react';

import { useRelations } from '@eventespresso/services';
import { entitiesWithGuIdInArray } from '@eventespresso/predicates';
import type { Datetime, EntityId } from '@eventespresso/constants';

type RecurrenceFilterCallback = (args: { recurrence: EntityId; datetimes: Array<Datetime> }) => Array<Datetime>;

const useRecurrenceFilter = (): RecurrenceFilterCallback => {
	const { getRelations } = useRelations();

	return useCallback<RecurrenceFilterCallback>(
		({ recurrence, datetimes }) => {
			// bail early
			if (!recurrence) {
				return datetimes;
			}
			const relatedDatetimeIds = getRelations({
				entity: 'recurrences',
				entityId: recurrence,
				relation: 'datetimes',
			});

			return entitiesWithGuIdInArray(datetimes, relatedDatetimeIds);
		},

		[getRelations]
	);
};

export default useRecurrenceFilter;
