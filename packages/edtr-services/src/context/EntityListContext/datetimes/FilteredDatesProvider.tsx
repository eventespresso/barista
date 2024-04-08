import { createContext, useEffect } from 'react';

import { useFilteredEntities } from '@eventespresso/services';
import { getGuids } from '@eventespresso/predicates';
import { useMemoStringify } from '@eventespresso/utils';
import type { EntityId } from '@eventespresso/constants';

import { useDatesListFilterState } from '../../../filterState';
import { domain, datesList } from '../../../constants';
import { useDatetimes } from '../../../apollo';
import { useVisibleDatetimeIds } from '../../../hooks';

const FilteredDatesContext = createContext<Array<EntityId>>(null);

const { Provider, Consumer: FilteredDatesConsumer } = FilteredDatesContext;

const FilteredDatesProvider: React.FC = ({ children }) => {
	const datetimes = useDatetimes();
	const filterState = useDatesListFilterState();

	const filteredEntities = useFilteredEntities(domain, datesList, datetimes, filterState);

	const filteredEntityIds = useMemoStringify(getGuids(filteredEntities));

	// Update Edtr state for isChained filter
	const [, setVisibleDatetimeIds] = useVisibleDatetimeIds();
	useEffect(() => {
		setVisibleDatetimeIds(filteredEntityIds);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filteredEntityIds]);

	return <Provider value={filteredEntityIds}>{children}</Provider>;
};

export { FilteredDatesContext, FilteredDatesProvider, FilteredDatesConsumer };
