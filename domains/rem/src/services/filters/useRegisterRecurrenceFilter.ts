import { useEffect, useRef } from 'react';

import { FilterBarService } from '@eventespresso/registry';

import { domain, datesList } from '@eventespresso/edtr-services';
import useRecurrenceFilter from './useRecurrenceFilter';
import type { Datetime } from '@eventespresso/constants';
import type { DatetimesFilterStateManager } from '@eventespresso/edtr-services';

type Domain = typeof domain;
type DFSM = DatetimesFilterStateManager;

const { registerFilter: registerDatesFilter } = new FilterBarService<Domain, typeof datesList, Datetime, DFSM>(
	domain,
	datesList
);

const useRegisterRecurrenceFilter: VoidFunction = () => {
	const recurrenceFilter = useRecurrenceFilter();
	// To avoid multiple filter registrations, we will store the already registered
	// filter unSubscribe callback in ref to use it to remove the existing filter.
	const unSubRecurrenceFilterRef = useRef<VoidFunction>();

	useEffect(() => {
		// If already registered, then de-register
		unSubRecurrenceFilterRef.current?.();

		// Register recurrence filter
		const unSubscribeRecurrenceFilter = registerDatesFilter(({ entityList, filterState }) => {
			return recurrenceFilter({ recurrence: filterState.recurrence, datetimes: entityList });
		}, 9); // we want recurrence to run first

		// update ref, it won't cause rerendersٖ
		unSubRecurrenceFilterRef.current = unSubscribeRecurrenceFilter;

		// Housekeeping
		return (): void => {
			unSubscribeRecurrenceFilter();
		};
	}, [recurrenceFilter]);
};

export default useRegisterRecurrenceFilter;
