import { useCallback, useMemo } from 'react';
import { __ } from '@eventespresso/i18n';

import { Cell, getCell } from '@eventespresso/ui-components';
import { filterCellByStartOrEndDate } from '@eventespresso/edtr-services';
import type { HeaderRowGeneratorFn } from '@eventespresso/ee-components';
import type { TicketsFilterStateManager } from '@eventespresso/edtr-services';

import Checkbox from './Checkbox';

type TicketsTableHeaderRowGen = HeaderRowGeneratorFn<TicketsFilterStateManager>;

const useHeaderRowGenerator = (): TicketsTableHeaderRowGen => {
	const startCell = useMemo(
		() =>
			getCell({
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

	return useCallback<TicketsTableHeaderRowGen>(
		(filterState) => {
			const { displayStartOrEndDate } = filterState;

			const cellsData: Array<Cell> = [
				{
					key: 'stripe',
					type: 'cell',
					className: 'ee-ticket-list-col-hdr ee-entity-list-status-stripe ee-rspnsv-table-column-nano',
					value: '',
				},
				{
					key: 'checkbox',
					type: 'cell',
					className: 'ee-rspnsv-table-column-micro',
					value: (
						<div className={'ee-rspnsv-table-hide-on-mobile'}>
							<Checkbox />
						</div>
					),
				},
				{
					key: 'id',
					type: 'cell',
					className:
						'ee-ticket-list-col-hdr ee-ticket-list-col-id ee-number-column ee-rspnsv-table-column-nano',
					value: __('ID'),
				},
				{
					key: 'name',
					type: 'cell',
					className: 'ee-ticket-list-col-hdr ee-ticket-list-col-name ee-rspnsv-table-column-bigger',
					value: __('Name'),
				},
				startCell,

				{
					key: 'end',
					type: 'cell',
					className: 'ee-ticket-list-col-hdr ee-ticket-list-col-end ee-rspnsv-table-column-default',
					value: (
						<>
							<span className={'ee-rspnsv-table-long-label'}>{__('Sale Ends')}</span>
							<span className={'ee-rspnsv-table-short-label'}>{__('Ends')}</span>
						</>
					),
				},
				{
					key: 'price',
					type: 'cell',
					className:
						'ee-ticket-list-col-hdr ee-ticket-list-col-price ee-rspnsv-table-column-tiny ee-number-column',
					value: __('Price'),
				},
				{
					key: 'quantity',
					type: 'cell',
					className: 'ee-ticket-list-col-hdr ee-col-capacity ee-rspnsv-table-column-tiny ee-number-column',
					value: __('Quantity'),
				},
				{
					key: 'sold',
					type: 'cell',
					className:
						'ee-ticket-list-col-hdr ee-ticket-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
					value: __('Sold'),
				},
				{
					key: 'registrations',
					type: 'cell',
					className:
						'ee-ticket-list-col-hdr ee-ticket-list-col-registrations ee-rspnsv-table-column-smaller ee-centered-column',
					value: (
						<>
							<span className={'ee-rspnsv-table-long-label'}>{__('Registrations')}</span>
							<span className={'ee-rspnsv-table-short-label'}>{__('Regs')}</span>
						</>
					),
				},
				{
					key: 'actions',
					type: 'cell',
					className: 'ee-ticket-list-col-hdr ee-actions-column ee-rspnsv-table-column-big ee-centered-column',
					value: <span className={'ee-rspnsv-table-long-label'}>{__('Actions')}</span>,
				},
			];

			const cells = cellsData.filter(filterCellByStartOrEndDate(displayStartOrEndDate));

			return {
				cells,
				className: 'ee-editor-ticket-list-items-header-row',
				key: 'ticket-header-row',
				primary: true,
				type: 'row',
			};
		},
		[startCell]
	);
};

export default useHeaderRowGenerator;
