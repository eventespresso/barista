import { useEffect, useRef } from 'react';

import useCacheRehydrationData from './useCacheRehydrationData';
import { useRelations } from '@eventespresso/services';
import { useUpdateRecurrenceList } from '../../../hooks';
import { DEFAULT_RECURRENCE_LIST_DATA, useRecurrenceQueryOptions } from '../queries';
import { getGuids } from '@eventespresso/predicates';
import { useDatetimes } from '@eventespresso/edtr-services';
import { assocPath } from 'ramda';

const useCacheRehydration = (): void => {
	const { getData: getRelationalData, initialize, isInitialized } = useRelations();

	const { recurrences: espressoRecurrences = DEFAULT_RECURRENCE_LIST_DATA, relations } = useCacheRehydrationData();

	// use the dates from EDTR Apollo cache
	const datetimeIn = getGuids(useDatetimes());

	const recurrenceQueryOptions = useRecurrenceQueryOptions(datetimeIn);
	const updateRecurrenceList = useUpdateRecurrenceList();

	const initialized = useRef(false);

	useEffect(() => {
		// Make aure REM rehydration happens after core
		if (initialized.current || !isInitialized()) {
			return;
		}
		/* Rehydrate recurrences */
		updateRecurrenceList({
			...recurrenceQueryOptions,
			data: {
				espressoRecurrences,
			},
		});

		const relationalData = getRelationalData();

		// Update recurrences to dates relational data
		let newRelationalData = assocPath(['recurrences'], relations?.recurrences, relationalData);

		// now we need to update the relational data from dates to recurrences
		// make sure we have something to deal with
		if (relations?.datetimes) {
			Object.entries(relations.datetimes).forEach(([datetimeId, relations]) => {
				newRelationalData = assocPath(
					['datetimes', datetimeId, 'recurrences'],
					relations.recurrences,
					newRelationalData
				);
			});
		}

		// set the new relational data
		initialize(newRelationalData);

		// switch the flag
		initialized.current = true;
	}, [
		espressoRecurrences,
		getRelationalData,
		initialize,
		isInitialized,
		recurrenceQueryOptions,
		relations,
		updateRecurrenceList,
	]);
};

export default useCacheRehydration;
