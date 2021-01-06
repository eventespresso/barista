import { useCallback, useMemo } from 'react';
import { __ } from '@eventespresso/i18n';

import { CellData } from '@eventespresso/ui-components';
import { filterCellByStartOrEndDate, useShowTicketBA } from '@eventespresso/edtr-services';
import type { HeaderRowGeneratorFn } from '@eventespresso/ee-components';
import type { TicketsFilterStateManager } from '@eventespresso/edtr-services';

import Checkbox from './Checkbox';

type TicketsTableHeaderRowGen = HeaderRowGeneratorFn<TicketsFilterStateManager>;

const useHeaderRowGenerator = (): TicketsTableHeaderRowGen => {
	const [showBulkActions] = useShowTicketBA();

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

	const checkboxCell: CellData = useMemo(
		() =>
			showBulkActions && {
				key: 'checkbox',
				size: 'micro',
				textAlign: 'center',
				value: (
					<div className={'ee-rspnsv-table-hide-on-mobile'}>
						<Checkbox />
					</div>
				),
			},
		[showBulkActions]
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
					<span className={'ee-rspnsv-table-long-label'}>{__('Goes on Sale')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('On Sale')}</span>
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
					<span className={'ee-rspnsv-table-long-label'}>{__('Sale Ends')}</span>
					<span className={'ee-rspnsv-table-short-label'}>{__('Ends')}</span>
				</>
			),
		}),
		[]
	);

	const priceCell: CellData = useMemo(
		() => ({
			key: 'price',
			size: 'tiny',
			textAlign: 'end',
			value: __('Price'),
		}),
		[]
	);

	const quantityCell: CellData = useMemo(
		() => ({
			key: 'quantity',
			size: 'tiny',
			textAlign: 'end',
			value: __('Quantity'),
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
					<span className={'ee-rspnsv-table-long-label'}>{__('Registrations')}</span>
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

	return useCallback<TicketsTableHeaderRowGen>(
		(filterState) => {
			const { displayStartOrEndDate } = filterState;

			const cellsData: Array<CellData> = [
				stripeCell,
				checkboxCell,
				idCell,
				nameCell,
				startCell,
				endCell,
				priceCell,
				quantityCell,
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
				className: 'ee-editor-ticket-list-items-header-row',
				key: 'ticket-header-row',
				primary: true,
				type: 'row',
			};
		},
		[
			idCell,
			actionsCell,
			checkboxCell,
			endCell,
			nameCell,
			priceCell,
			quantityCell,
			registrationsCell,
			soldCell,
			startCell,
			stripeCell,
		]
	);
};

export default useHeaderRowGenerator;
