import React, { useCallback } from 'react';
import { format } from 'date-fns';
import { filter, pipe } from 'ramda';

import { addZebraStripesOnMobile } from '@eventespresso/components';
import DateRegistrationsLink from '@edtrUI/datetimes/DateRegistrationsLink';
import DateActionsMenu from '@edtrUI/datetimes/datesList/actionsMenu/DateActionsMenu';
import type { Datetime } from '@eventespresso/edtr-services';
import { filterCellByStartOrEndDate } from '@eventespresso/edtr-services';
import { ENTITY_LIST_DATE_TIME_FORMAT } from '@eventespresso/constants';
import { getDatetimeBackgroundColorClassName, datetimeStatus } from '@eventespresso/helpers'; // '@sharedEntities/datetimes/helpers';
import { shortenGuid } from '@eventespresso/services';
import DateCapacity from '../cardView/DateCapacity';
import type { BodyRowGeneratorFn } from '@eventespresso/components';
import type { DatetimesFilterStateManager } from '@edtrServices/filterState';
import { EditableName } from '../editable';

import '../../../../../../../packages/styles/src/root/entity-status.css';

type DatesTableBodyRowGen = BodyRowGeneratorFn<Datetime, DatetimesFilterStateManager>;

const exclude = ['row', 'stripe', 'name', 'actions'];
const addZebraStripes = addZebraStripesOnMobile(exclude);

const useBodyRowGenerator = (): DatesTableBodyRowGen => {
	return useCallback<DatesTableBodyRowGen>(({ entity: datetime, filterState }) => {
		const { displayStartOrEndDate, sortingEnabled } = filterState;
		const bgClassName = getDatetimeBackgroundColorClassName(datetime);
		const id = datetime.dbId || shortenGuid(datetime.id);
		const statusClassName = datetimeStatus(datetime);

		const capacity = {
			key: 'capacity',
			type: 'cell',
			className: 'ee-date-list-cell ee-date-list-col-capacity ee-rspnsv-table-column-tiny ee-number-column',
			value: sortingEnabled ? datetime.capacity : <DateCapacity entity={datetime} />,
		};

		const name = {
			key: 'name',
			type: 'cell',
			className:
				'ee-date-list-cell ee-date-list-col-name ee-col-name ee-rspnsv-table-column-bigger ee-rspnsv-table-hide-on-mobile',
			value: sortingEnabled ? (
				datetime.name
			) : (
				<EditableName className={'ee-entity-list-text ee-focus-priority-5'} entity={datetime} view={'table'} />
			),
		};

		const cellsData = [
			{
				key: 'stripe',
				type: 'cell',
				className: `ee-date-list-cell ee-entity-list-status-stripe ${bgClassName} ee-rspnsv-table-column-nano`,
				value: <div className={'ee-rspnsv-table-show-on-mobile'}>{datetime.name}</div>,
			},
			{
				key: 'id',
				type: 'cell',
				className: 'ee-date-list-cell ee-date-list-col-id ee-rspnsv-table-column-nano ee-number-column',
				value: id,
			},
			name,
			{
				key: 'start',
				type: 'cell',
				className: 'ee-date-list-cell ee-date-list-col-start ee-rspnsv-table-column-default',
				value: format(new Date(datetime.startDate), ENTITY_LIST_DATE_TIME_FORMAT),
			},
			{
				key: 'end',
				type: 'cell',
				className: 'ee-date-list-cell ee-date-list-col-end ee-rspnsv-table-column-default',
				value: format(new Date(datetime.endDate), ENTITY_LIST_DATE_TIME_FORMAT),
			},
			capacity,
			{
				key: 'sold',
				type: 'cell',
				className: 'ee-date-list-cell ee-date-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
				value: datetime.sold || 0,
			},
			{
				key: 'registrations',
				type: 'cell',
				className:
					'ee-date-list-cell ee-date-list-col-registrations ee-rspnsv-table-column-smaller ee-centered-column',
				value: sortingEnabled ? '-' : <DateRegistrationsLink datetime={datetime} />,
			},
			{
				key: 'actions',
				type: 'cell',
				className: 'ee-date-list-cell ee-date-list-col-actions ee-actions-column ee-rspnsv-table-column-big',
				value: sortingEnabled ? '-' : <DateActionsMenu entity={datetime} />,
			},
		];

		const filterCells = filter(filterCellByStartOrEndDate(displayStartOrEndDate));

		const cells = pipe(filterCells, addZebraStripes)(cellsData);

		return {
			cells,
			className: `ee-editor-date-list-view-row ${statusClassName}`,
			id: `ee-editor-date-list-view-row-${datetime.id}`,
			key: `row-${datetime.id}`,
			type: 'row',
		};
	}, []);
};

export default useBodyRowGenerator;
