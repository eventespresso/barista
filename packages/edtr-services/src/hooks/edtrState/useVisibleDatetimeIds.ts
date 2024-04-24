import { makeVar, useReactiveVariable, ReactiveVariable } from '@eventespresso/data';
import type { EntityId } from '@eventespresso/constants';

type DatetimeIds = Array<EntityId>;

const visibleDatetimeIds = makeVar<DatetimeIds>([]);

export const useVisibleDatetimeIds = (): ReactiveVariable<DatetimeIds> => {
	return useReactiveVariable(visibleDatetimeIds);
};
