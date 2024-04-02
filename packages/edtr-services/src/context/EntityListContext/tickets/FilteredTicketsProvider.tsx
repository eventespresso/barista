import { createContext, useEffect } from 'react';

import { getGuids } from '@eventespresso/predicates';
import { useFilteredEntities } from '@eventespresso/services';
import type { EntityId } from '@eventespresso/constants'
import { useMemoStringify } from '@eventespresso/utils';

import { useTicketsListFilterState } from '../../../filterState';
import { domain, ticketsList } from '../../../constants';
import { useTickets } from '../../../apollo';
import { useVisibleTicketIds } from '../../../hooks';

const FilteredTicketsContext = createContext<Array<EntityId>>(null);

const { Provider, Consumer: FilteredTicketsConsumer } = FilteredTicketsContext;

const FilteredTicketsProvider: React.FC = ({ children }) => {
	const tickets = useTickets();

	const filterState = useTicketsListFilterState();

	const filteredEntities = useFilteredEntities(domain, ticketsList, tickets, filterState);

	const filteredEntityIds = useMemoStringify(getGuids(filteredEntities));

	// Update Edtr state for bulk edit.
	const [, setVisibleTicketIds] = useVisibleTicketIds();
	useEffect(() => {
		setVisibleTicketIds(getGuids(filteredEntities));
	}, [filteredEntities, filteredEntityIds, setVisibleTicketIds]);

	return <Provider value={filteredEntityIds}>{children}</Provider>;
};

export { FilteredTicketsContext, FilteredTicketsProvider, FilteredTicketsConsumer };
