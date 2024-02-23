import type { EntityListFilterStateManager } from '@eventespresso/services';
import type { TicketsSalesFilters, TicketsStatusFilters } from '@eventespresso/predicates';

import type {
	SortBy,
	EntityFilterState,
	EntityFilterAction,
	EntityFilterActionType,
	EntityFilterStateManager,
	EntityFilterStateReducer,
} from '../';

export interface TicketsFilterState extends EntityFilterState {
	isChained: boolean;
	sales: TicketsSalesFilters;
	status: TicketsStatusFilters;
}

export type TicketsFilterActionType = 'SET_SALES' | 'SET_STATUS' | 'TOGGLE_IS_CHAINED' | EntityFilterActionType;

export interface TicketsFilterAction extends Partial<TicketsFilterState>, EntityFilterAction<TicketsFilterActionType> {}

export interface TicketsFilterStateManager
	extends EntityListFilterStateManager<SortBy>,
		EntityFilterStateManager,
		TicketsFilterState {
	setSales: (sales: TicketsSalesFilters) => void;
	setStatus: (status: TicketsStatusFilters) => void;
	toggleIsChained: VoidFunction;
	visibleDatesStr: string;
}

export type TicketsFilterStateReducer = EntityFilterStateReducer<TicketsFilterState, TicketsFilterAction>;
