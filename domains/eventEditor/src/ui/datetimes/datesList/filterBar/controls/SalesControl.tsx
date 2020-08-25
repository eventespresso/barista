import React from 'react';
import { __ } from '@wordpress/i18n';

import { SelectInput } from '@eventespresso/components';
import { DatetimeSales } from '@edtrServices/filterState';
import { getPropsAreEqual } from '@eventespresso/utils';
import { useMemoStringify } from '@eventespresso/hooks';
import { DatetimesFilterStateManager } from '@edtrServices/filterState';

type StatusControlProps = Pick<DatetimesFilterStateManager, 'sales' | 'setSales'>;

const SalesControl: React.FC<StatusControlProps> = React.memo(({ sales, setSales }) => {
	const options = useMemoStringify([
		{
			value: DatetimeSales.all,
			label: __('all dates'),
		},
		{
			value: DatetimeSales.above90Capacity,
			label: __('dates above 90% capacity'),
		},
		{
			value: DatetimeSales.above75Capacity,
			label: __('dates above 75% capacity'),
		},
		{
			value: DatetimeSales.above50Capacity,
			label: __('dates above 50% capacity'),
		},
		{
			value: DatetimeSales.below50Capacity,
			label: __('dates below 50% capacity'),
		},
	]);
	return <SelectInput label={__('sales')} value={sales} options={options} onChangeValue={setSales} />;
});

export default React.memo(SalesControl, getPropsAreEqual(['sales']));
