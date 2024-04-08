import type { EntityListFilterStateManager } from '@eventespresso/services';
import type { DatetimeSales, DatetimeStatus } from '@eventespresso/predicates';

import type {
	SortBy,
	EntityFilterState,
	EntityFilterAction,
	EntityFilterActionType,
	EntityFilterStateManager,
	EntityFilterStateReducer,
} from '../';
import type { EntityId } from '@eventespresso/constants';

export interface DatetimesFilterState extends EntityFilterState {
	sales: DatetimeSales;
	status: DatetimeStatus;
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
	setSales: (sales: DatetimeSales) => void;
	setStatus: (status: DatetimeStatus) => void;
	setRecurrence: (recurrence: EntityId) => void;
}

export type DatetimesFilterStateReducer = EntityFilterStateReducer<DatetimesFilterState, DatetimesFilterAction>;
