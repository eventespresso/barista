/**
 * This file registers the filters for dates table via registry package
 */
import React from 'react';
import { insert } from 'ramda';

import { __ } from '@eventespresso/i18n';
import { EntityTableFilters } from '@eventespresso/registry';
import { datesList, domain } from '@eventespresso/edtr-services';
import type { DatetimesFilterStateManager, Datetime } from '@eventespresso/edtr-services';
import type { Cell } from '@eventespresso/components';
import RecurrenceTag from '../../ui/RecurrenceTag';

type Domain = typeof domain;
type DFSM = DatetimesFilterStateManager;

const { registerFilter } = new EntityTableFilters<Domain, typeof datesList, DFSM, Datetime>(domain, datesList);

const cell: Cell = {
	key: 'recurrence-series',
	type: 'cell',
	className: 'ee-date-list-cell ee-rspnsv-table-column-default',
	value: null,
};
// Register sales filter
registerFilter(({ row, type, entity }) => {
	let value: React.ReactNode;
	if (type === 'body') {
		value = <RecurrenceTag datetime={entity} isTableView />;
	} else if (type === 'header') {
		value = (
			<>
				<span className={'ee-rspnsv-table-long-label'}>{__('Recurring series')}</span>
				<span className={'ee-rspnsv-table-short-label'}>{__('Series')}</span>
			</>
		);
	}
	// insert the cell at index 6
	const cells = insert(6, { ...cell, value }, row.cells);
	return { ...row, cells };
}, 11);
