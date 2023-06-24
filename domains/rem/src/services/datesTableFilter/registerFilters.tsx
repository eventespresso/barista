/**
 * This file registers the filters for dates table via registry package
 */

import * as R from 'ramda';

import { __ } from '@eventespresso/i18n';
import { EntityTableFilters } from '@eventespresso/registry';
import { datesList, domain } from '@eventespresso/edtr-services';

import type { CellData } from '@eventespresso/ui-components';
import type { DatetimesFilterStateManager } from '@eventespresso/edtr-services';

import RecurrenceTag from '../../ui/RecurrenceTag';

type Domain = typeof domain;
type DFSM = DatetimesFilterStateManager;

const { registerFilter } = new EntityTableFilters<Domain, typeof datesList, DFSM>(domain, datesList);

const cell: CellData = {
	key: 'recurrence-series',
	size: 'tiny',
	textAlign: 'end',
	value: null,
};

// Register sales filter
registerFilter(({ row, type, entityId }) => {
	let value: CellData['value'];
	if (type === 'body') {
		value = <RecurrenceTag datetimeId={entityId} isTableView />;
	} else if (type === 'header') {
		value = (
			<>
				<span className={'ee-rspnsv-table-long-label'}>{__('REM Series')}</span>
				<span className={'ee-rspnsv-table-short-label'}>{__('Series')}</span>
			</>
		);
	}
	// insert the cell at index 6
	const cells: Array<CellData> = R.insert(6, { ...cell, value }, row.cells);
	return { ...row, cells };
}, 11);
