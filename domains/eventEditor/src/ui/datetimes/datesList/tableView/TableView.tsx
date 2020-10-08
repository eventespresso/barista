import React from 'react';
import { __ } from '@eventespresso/i18n';

import { EntityTable } from '@eventespresso/components';
import useHeaderRowGenerator from './useHeaderRowGenerator';
import useBodyRowGenerator from './useBodyRowGenerator';
import { useReorderDatetimes, useDatesListFilterState, useFilteredDates } from '@eventespresso/edtr-services';
import { withBulkEdit } from '@eventespresso/services';
import { Actions as BulkEditActions } from '../bulkEdit';

import './styles.scss';

/**
 * Displays event date details in a standard list table like view
 */
const TableView: React.FC = () => {
	const filterState = useDatesListFilterState();
	const filteredEntities = useFilteredDates();

	const { sortResponder: sortDates } = useReorderDatetimes(filteredEntities);

	const bodyRowGenerator = useBodyRowGenerator();
	const headerRowGenerator = useHeaderRowGenerator();

	return (
		<>
			<BulkEditActions />
			<EntityTable
				entities={filteredEntities}
				filterState={filterState}
				bodyRowGenerator={bodyRowGenerator}
				headerRowGenerator={headerRowGenerator}
				className={'ee-dates-list-list-view ee-fade-in'}
				tableId='date-entities-table-view'
				tableCaption={__('Event Dates')}
				onSort={sortDates}
			/>
		</>
	);
};

export default withBulkEdit(TableView);
