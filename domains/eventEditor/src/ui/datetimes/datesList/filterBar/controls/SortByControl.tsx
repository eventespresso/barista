import React from 'react';

import { SelectInput } from '@eventespresso/components';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { objectToSelectOptions } from '@eventespresso/utils';

import { labels, sortByOptions } from './options';

const options = objectToSelectOptions(sortByOptions);
/**
 * filter for controlling the sorting of a list of Event Dates
 */
const SortByControl: React.FC = () => {
	const { sortBy, setSortBy } = useDatesListFilterState();

	return (
		<SelectInput
			label={labels.sortBy}
			className='espresso-date-list-filter-bar-order-select'
			value={sortBy}
			options={options}
			onChangeValue={setSortBy}
		/>
	);
};

export default SortByControl;
