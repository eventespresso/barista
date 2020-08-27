import React from 'react';
import { __ } from '@wordpress/i18n';
import { SelectInput } from '@eventespresso/components';
import { DisplayStartOrEndDate } from '@eventespresso/edtr-services';
import { useTicketsListFilterState } from '@edtrServices/filterState';
import { useMemoStringify } from '@eventespresso/hooks';

/**
 * filter for controlling which dates display in a list of Event Dates
 */
const DisplayStartOrEndDateControl: React.FC = () => {
	const { displayStartOrEndDate, setDisplayStartOrEndDate } = useTicketsListFilterState();
	const options = useMemoStringify([
		{
			value: DisplayStartOrEndDate.start,
			label: __('ticket sales start date only'),
		},
		{
			value: DisplayStartOrEndDate.end,
			label: __('ticket sales end date only'),
		},
		{
			value: DisplayStartOrEndDate.both,
			label: __('ticket sales start and end dates'),
		},
	]);
	return (
		<SelectInput
			label={__('display')}
			className='espresso-date-list-filter-bar-display-select'
			value={displayStartOrEndDate}
			options={options}
			onChangeValue={setDisplayStartOrEndDate}
		/>
	);
};

export default DisplayStartOrEndDateControl;
