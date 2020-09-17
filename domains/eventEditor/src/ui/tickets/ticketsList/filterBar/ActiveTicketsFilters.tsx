import React, { useCallback } from 'react';
import { __ } from '@eventespresso/i18n';

import { ActiveFilters, FilterTag } from '@eventespresso/components';

import { TicketsSales, TicketsStatus, useTicketsListFilterState } from '@edtrServices/filterState';
import { labels, statusOptions, salesOptions } from './controls/options';

const ActiveTicketsSFilters: React.FC = () => {
	const {
		status,
		setStatus,
		sales,
		setSales,
		searchText,
		setSearchText,
		isChained,
		toggleIsChained,
	} = useTicketsListFilterState();

	const statusTitle = `${labels.status}: ${statusOptions?.[status]}`;
	const salesTitle = `${labels.sales}: ${salesOptions?.[sales]}`;
	const searchTitle = `${labels.search}: ${searchText}`;
	const isChainedTitle = `${labels.isChained}: ${__('ON')}`;

	const onRemoveStatus = useCallback(() => setStatus(TicketsStatus.all), [setStatus]);
	const onRemoveSales = useCallback(() => setSales(TicketsSales.all), [setSales]);
	const onRemoveSearch = useCallback(() => setSearchText(''), [setSearchText]);

	return (
		<ActiveFilters>
			{status !== TicketsStatus.all && <FilterTag title={statusTitle} onRemove={onRemoveStatus} />}
			{sales !== TicketsSales.all && <FilterTag title={salesTitle} onRemove={onRemoveSales} />}
			{searchText ? <FilterTag title={searchTitle} onRemove={onRemoveSearch} /> : null}
			{isChained && <FilterTag title={isChainedTitle} onRemove={toggleIsChained} />}
		</ActiveFilters>
	);
};

export default ActiveTicketsSFilters;
