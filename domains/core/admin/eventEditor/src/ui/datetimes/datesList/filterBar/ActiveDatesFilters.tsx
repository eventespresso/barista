import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { ActiveFilters, FilterTag } from '@eventespresso/ui-components';
import { useDatesListFilterState } from '@eventespresso/edtr-services';
import { DatetimeSalesFilters, DatetimeStatusFilters } from '@eventespresso/predicates';

import { labels, statusOptions, salesOptions } from './controls/options';

const ActiveDatesFilters: React.FC = () => {
	const { status, setStatus, sales, setSales, searchText, setSearchText, recurrence, setRecurrence } =
		useDatesListFilterState();

	const statusTitle = `${labels.status}: ${statusOptions?.[status]}`;
	const salesTitle = `${labels.sales}: ${salesOptions?.[sales]}`;
	const searchTitle = `${labels.search}: ${searchText}`;
	const recurrenceTitle = `${labels.recurrence}: ${__('ON')}`;

	const onRemoveStatus = useCallback(() => setStatus(DatetimeStatusFilters.all), [setStatus]);
	const onRemoveSales = useCallback(() => setSales(DatetimeSalesFilters.all), [setSales]);
	const onRemoveRecurrence = useCallback(() => setRecurrence(''), [setRecurrence]);
	const onRemoveSearch = useCallback(() => setSearchText(''), [setSearchText]);

	return (
		<ActiveFilters>
			{status !== DatetimeStatusFilters.all && <FilterTag title={statusTitle} onRemove={onRemoveStatus} />}
			{sales !== DatetimeSalesFilters.all && <FilterTag title={salesTitle} onRemove={onRemoveSales} />}
			{recurrence && <FilterTag title={recurrenceTitle} onRemove={onRemoveRecurrence} />}
			{searchText ? <FilterTag title={searchTitle} onRemove={onRemoveSearch} /> : null}
		</ActiveFilters>
	);
};

export default ActiveDatesFilters;
