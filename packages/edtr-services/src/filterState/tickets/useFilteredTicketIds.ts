import { useContext } from 'react';
import invariant from 'invariant';

import type { EntityId } from '@eventespresso/constants';

import { FilteredTicketsContext } from '../../context';

const useFilteredTicketIds = (): Array<EntityId> => {
	const value = useContext(FilteredTicketsContext);

	invariant(value, 'useFilteredTicketIds must be used inside <FilteredTicketsProvider> component');

	return value;
};

export default useFilteredTicketIds;
