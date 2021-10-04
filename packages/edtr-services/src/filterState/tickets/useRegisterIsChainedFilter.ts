import { useEffect, useRef } from 'react';

import { FilterBarService } from '@eventespresso/registry';
import type { TicketsFilterStateManager } from './types';

import { domain, ticketsList } from '../../constants';
import useIsChainedFilter from './useIsChainedFilter';
import type { Ticket } from '../../apollo';

type Domain = typeof domain;
type TFSM = TicketsFilterStateManager;

const { registerFilter: registerTicketsFilter } = new FilterBarService<Domain, typeof ticketsList, Ticket, TFSM>(
	domain,
	ticketsList
);

const useRegisterIsChainedFilter: VoidFunction = () => {
	/**
	 * isChained filter needs special treatment :)
	 *
	 * Unlike other sorters and filters, isChained filter is dependent upon
	 * external state which can change. Thus we need to update our filter callback
	 * to make sure the stale state is not bound to the filter callback.
	 */
	const [isChainedFilter, isChainedDeps] = useIsChainedFilter();
	// To avoid multiple filter registrations, we will store the already registered
	// filter unSubscribe callback in ref to use it to remove the existing filter.
	const unSubIsChainedFilterRef = useRef<VoidFunction>();

	useEffect(() => {
		// If already registered, de-register
		unSubIsChainedFilterRef.current?.();

		// Register isChained filter
		const unSubscribeIsChainedFilter = registerTicketsFilter(({ entityList, filterState }) => {
			return isChainedFilter({ isChained: filterState.isChained, tickets: entityList });
		}, 9); // we want isChained to run first

		// update ref, it won't cause rerendersٖ
		unSubIsChainedFilterRef.current = unSubscribeIsChainedFilter;
		// Housekeeping
		return (): void => {
			unSubIsChainedFilterRef.current?.();
		};
	}, [isChainedDeps, isChainedFilter]);
};

export default useRegisterIsChainedFilter;
