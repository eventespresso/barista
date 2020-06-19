import React from 'react';
import { __ } from '@wordpress/i18n';
import { SelectInput } from '@eventespresso/components';
import { SortBy } from '@eventespresso/edtr-services';
import { getPropsAreEqual } from '@eventespresso/services';
import { DatetimesFilterStateManager } from '@edtrServices/filterState';

type SortByControlProps = Pick<DatetimesFilterStateManager, 'sortBy' | 'setSortBy'>;

type SortByOptions = Array<{
	value: SortBy;
	label: string;
}>;
/**
 * filter for controlling the sorting of a list of Event Dates
 */
const SortByControl: React.FC<SortByControlProps> = React.memo(({ sortBy, setSortBy }) => {
	const options: SortByOptions = [
		{
			value: 'date',
			label: __('start date'),
		},
		{
			value: 'name',
			label: __('name'),
		},
		{
			value: 'id',
			label: __('ID'),
		},
		{
			value: 'order',
			label: __('custom order'),
		},
	];

	return (
		<SelectInput
			label={__('sort by')}
			className='espresso-date-list-filter-bar-order-select'
			value={sortBy}
			options={options}
			onChangeValue={setSortBy}
		/>
	);
});

export default React.memo(SortByControl, getPropsAreEqual(['sortBy']));
