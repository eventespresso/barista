import { useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { filterCellByStartOrEndDate } from '@eventespresso/edtr-services';

import type { CellData } from '@eventespresso/ui-components';
import type { HeaderRowGeneratorFn } from '@eventespresso/ee-components';
import type { DatetimesFilterStateManager } from '@eventespresso/edtr-services';
import { useFeature } from '@eventespresso/services';

import Checkbox from './Checkbox';

type DatesTableHeaderRowGen = HeaderRowGeneratorFn<DatetimesFilterStateManager>;

const useHeaderRowGenerator = (): DatesTableHeaderRowGen => {
	const canUseBulkEdit = useFeature('ee_event_editor_bulk_edit');
	const stripeCell: CellData = useMemo(
		() => ({
			className: 'ee-entity-list-status-stripe',
			key: 'stripe',
			size: 'nano',
			textAlign: 'center',
			value: '',
		}),
		[]
	);

	const idCell: CellData = useMemo(
		() => ({
			key: 'id',
			size: 'micro',
			textAlign: 'end',
			value: __('ID'),
		}),
		[]
	);

	const nameCell: CellData = useMemo(
		() => ({
			key: 'name',
			size: 'huge',
			value: __('Name'),
		}),
		[]
	);

	const startCell: CellData = useMemo(
		() => ({
			key: 'start',
			size: 'default',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('Start Date')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('Start')}</span>
				</>
			),
		}),
		[]
	);

	const endCell: CellData = useMemo(
		() => ({
			key: 'end',
			size: 'default',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('End Date')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('End')}</span>
				</>
			),
		}),
		[]
	);

	const capacityCell: CellData = useMemo(
		() => ({
			className: 'ee-col__inline-edit',
			key: 'capacity',
			size: 'tiny',
			textAlign: 'end',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('Capacity')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('Cap')}</span>
				</>
			),
		}),
		[]
	);

	const soldCell: CellData = useMemo(
		() => ({
			key: 'sold',
			size: 'tiny',
			textAlign: 'end',
			value: __('Sold'),
		}),
		[]
	);

	const registrationsCell: CellData = useMemo(
		() => ({
			key: 'registrations',
			size: 'smaller',
			textAlign: 'center',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('Reg list')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('Regs')}</span>
				</>
			),
		}),
		[]
	);

	const actionsCell: CellData = useMemo(
		() => ({
			key: 'actions',
			size: 'big',
			textAlign: 'center',
			value: (
				<>
					<span className={'ee-rspnsv-table-long-label'}>{__('Actions')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('Actions')}</span>
				</>
			),
		}),
		[]
	);

	return useCallback<DatesTableHeaderRowGen>(
		(filterState) => {
			const { displayStartOrEndDate } = filterState;

			const checkboxCell: CellData = canUseBulkEdit && {
				key: 'checkbox',
				size: 'micro',
				textAlign: 'center',
				value: (
					<div className={'ee-rspnsv-table-hide-on-mobile'}>
						<Checkbox />
					</div>
				),
			};

			const cellsData: Array<CellData> = [
				stripeCell,
				checkboxCell,
				idCell,
				nameCell,
				startCell,
				endCell,
				capacityCell,
				soldCell,
				registrationsCell,
				actionsCell,
			];

			const cells = cellsData
				.filter(
					// removes falsy values
					Boolean
				)
				.filter(filterCellByStartOrEndDate(displayStartOrEndDate));

			return {
				cells,
				className: 'ee-editor-date-list-items-header-row',
				key: 'dates-list-header',
				primary: true,
				type: 'row',
			};
		},
		[
			actionsCell,
			canUseBulkEdit,
			capacityCell,
			endCell,
			idCell,
			nameCell,
			registrationsCell,
			soldCell,
			startCell,
			stripeCell,
		]
	);
};

export default useHeaderRowGenerator;
