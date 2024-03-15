import type { EntityListFilterStateManager } from '@eventespresso/services';
import type { DatetimeSalesFilters, DatetimeStatusFilters } from '@eventespresso/predicates';

import type {
	SortBy,
	EntityFilterState,
	EntityFilterAction,
	EntityFilterActionType,
	EntityFilterStateManager,
	EntityFilterStateReducer,
} from '../';
import type { EntityId } from '@eventespresso/data';

export interface DatetimesFilterState extends EntityFilterState {
	sales: DatetimeSalesFilters;
	status: DatetimeStatusFilters;
	recurrence: EntityId;
}

export type DatetimesFilterActionType = 'SET_SALES' | 'SET_STATUS' | 'SET_RECURRENCE' | EntityFilterActionType;

export interface DatetimesFilterAction
	extends Partial<DatetimesFilterState>,
		EntityFilterAction<DatetimesFilterActionType> {}

export interface DatetimesFilterStateManager
	extends EntityListFilterStateManager<SortBy>,
		EntityFilterStateManager,
		DatetimesFilterState {
	setSales: (sales: DatetimeSalesFilters) => void;
	setStatus: (status: DatetimeStatusFilters) => void;
	setRecurrence: (recurrence: EntityId) => void;
}

export type DatetimesFilterStateReducer = EntityFilterStateReducer<DatetimesFilterState, DatetimesFilterAction>;
