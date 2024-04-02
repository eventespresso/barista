/**
 * This file registers the filters for dates list via registry package
 */
import { FilterBarService } from '@eventespresso/registry';
import { dateSalesFilter, dateStatusFilter, sortDates } from '@eventespresso/predicates';
import { datesList, domain } from '@eventespresso/edtr-services';
import { entityListSearch } from '@eventespresso/utils';
import type { Datetime } from '@eventespresso/constants';
import type { DatetimesFilterStateManager } from '@eventespresso/edtr-services';

type Domain = typeof domain;
type DFSM = DatetimesFilterStateManager;

const {
	registerFilter: registerDatesFilter,
	registerSearch: registerDatesSearch,
	registerSorter: registerDatesSorter,
} = new FilterBarService<Domain, typeof datesList, Datetime, DFSM>(domain, datesList);

// Register sales filter
registerDatesFilter(({ entityList, filterState }) => {
	return dateSalesFilter({ dates: entityList, sales: filterState.sales });
}, 11);

// Register status filter
registerDatesFilter(({ entityList, filterState }) => {
	return dateStatusFilter({ dates: entityList, status: filterState.status });
}, 9);

// Register search
registerDatesSearch(({ entityList, filterState }) => {
	return entityListSearch<Datetime>({
		entities: entityList,
		searchFields: ['name', 'description'],
		searchText: filterState.searchText,
	});
});

// Register sorter
registerDatesSorter(({ entityList, filterState }) => {
	return sortDates({ dates: entityList, sortBy: filterState.sortBy });
});
