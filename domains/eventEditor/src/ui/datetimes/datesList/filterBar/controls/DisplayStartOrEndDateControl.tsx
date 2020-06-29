import React from 'react';
import { __ } from '@wordpress/i18n';
import { SelectInput } from '@eventespresso/components';
import { DisplayStartOrEndDate } from '@eventespresso/edtr-services';
import { getPropsAreEqual } from '@eventespresso/services';
import type { DatetimesFilterStateManager } from '@edtrServices/filterState';
import { useMemoStringify } from '@eventespresso/services';

type DisplayStartOrEndDateControlProps = Pick<
	DatetimesFilterStateManager,
	'displayStartOrEndDate' | 'setDisplayStartOrEndDate'
>;
/**
 * filter for controlling which dates display in a list of Event Dates
 */
const DisplayStartOrEndDateControl: React.FC<DisplayStartOrEndDateControlProps> = React.memo(
	({ displayStartOrEndDate, setDisplayStartOrEndDate }) => {
		const options = useMemoStringify([
			{
				value: DisplayStartOrEndDate.start,
				label: __('start dates only'),
			},
			{
				value: DisplayStartOrEndDate.end,
				label: __('end dates only'),
			},
			{
				value: DisplayStartOrEndDate.both,
				label: __('start and end dates'),
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
	}
);

export default React.memo(DisplayStartOrEndDateControl, getPropsAreEqual(['displayStartOrEndDate']));
