import { useContext } from 'react';
import invariant from 'invariant';

import type { EntityId } from '@eventespresso/constants';
import { FilteredDatesContext } from '../../context';

const useFilteredDateIds = (): Array<EntityId> => {
	const value = useContext(FilteredDatesContext);

	invariant(value, 'useFilteredDateIds must be used inside <FilteredDatesProvider> component');

	return value;
};
export default useFilteredDateIds;
