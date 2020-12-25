import React from 'react';

import { Select } from '@eventespresso/ui-components';
import { useDatesListFilterState } from '@eventespresso/edtr-services';
import { objectToSelectOptions } from '@eventespresso/utils';

import { labels, sortByOptions } from './options';

const options = objectToSelectOptions(sortByOptions);
/**
 * filter for controlling the sorting of a list of Event Dates
 */
const SortByControl: React.FC = () => {
	const { sortBy, setSortBy } = useDatesListFilterState();

	return (
		<Select
			id='dates-list-sort-by-control'
			label={labels.sortBy}
			value={sortBy}
			options={options}
			onChangeValue={setSortBy}
		/>
	);
};

export default SortByControl;
