import { useCallback } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';
import { filter, pipe } from 'ramda';

import { addZebraStripesOnMobile, CellData } from '@eventespresso/ui-components';
import { CurrencyDisplay } from '@eventespresso/ee-components';
import { filterCellByStartOrEndDate, useLazyTicket, useShowTicketBA } from '@eventespresso/edtr-services';
import { ENTITY_LIST_DATE_TIME_FORMAT } from '@eventespresso/constants';
import { getTicketBackgroundColorClassName, ticketStatus } from '@eventespresso/helpers';
import { shortenGuid } from '@eventespresso/utils';
import type { BodyRowGeneratorFn } from '@eventespresso/ee-components';
import type { TicketsFilterStateManager } from '@eventespresso/edtr-services';

import TicketActionsMenu from '@edtrUI/tickets/ticketsList/actionsMenu/TicketActionsMenu';
import TicketQuantity from '../cardView/TicketQuantity';
import { EditableName } from '../editable';
import TicketRegistrationsLink from '../../TicketRegistrationsLink';
import Checkbox from './Checkbox';

type TicketsTableBodyRowGen = BodyRowGeneratorFn<TicketsFilterStateManager>;

const useBodyRowGenerator = (): TicketsTableBodyRowGen => {
	const getTicket = useLazyTicket();
	const [showBulkActions] = useShowTicketBA();

	return useCallback<TicketsTableBodyRowGen>(
		({ entityId, filterState }) => {
			const ticket = getTicket(entityId);
			const { displayStartOrEndDate, sortingEnabled } = filterState;

			const bgClassName = getTicketBackgroundColorClassName(ticket);
			const id = ticket.dbId || shortenGuid(ticket.id);
			const statusClassName = ticketStatus(ticket);

			const stripeCell: CellData = {
				className: classNames('ee-entity-list-status-stripe', bgClassName),
				key: 'stripe',
				showValueOnMobile: true,
				textAlign: 'center',
				value: ticket.name,
			};

			const bulkActionCheckboxCell: CellData = showBulkActions && {
				key: 'cell',
				size: 'micro',
				textAlign: 'center',
				value: <Checkbox dbId={ticket.dbId} id={ticket.id} />,
			};

			const idCell: CellData = {
				key: 'id',
				size: 'micro',
				textAlign: 'end',
				value: id,
			};

			const nameCell: CellData = {
				className: 'ee-col-name ee-rspnsv-table-hide-on-mobile',
				key: 'name',
				size: 'huge',
				value: sortingEnabled ? (
					ticket.name
				) : (
					<EditableName
						className={'ee-entity-list-text ee-focus-priority-5'}
						entity={ticket}
						view={'table'}
					/>
				),
			};

			const startCell: CellData = {
				key: 'start',
				size: 'default',
				value: format(new Date(ticket.startDate), ENTITY_LIST_DATE_TIME_FORMAT),
			};

			const endCell: CellData = {
				key: 'end',
				size: 'default',
				value: format(new Date(ticket.endDate), ENTITY_LIST_DATE_TIME_FORMAT),
			};

			const priceCell: CellData = {
				key: 'price',
				size: 'tiny',
				textAlign: 'end',
				value: <CurrencyDisplay value={ticket.price} />,
			};

			const soldCell: CellData = {
				key: 'sold',
				size: 'tiny',
				textAlign: 'end',
				value: ticket.sold,
			};

			const quantityCell: CellData = {
				className: 'ee-col__inline-edit',
				key: 'quantity',
				size: 'tiny',
				textAlign: 'end',
				value: sortingEnabled ? ticket.quantity : <TicketQuantity entity={ticket} />,
			};

			const registrationsCell: CellData = {
				key: 'registrations',
				size: 'smaller',
				textAlign: 'center',
				value: sortingEnabled ? '-' : <TicketRegistrationsLink ticket={ticket} />,
			};

			const actionsCell: CellData = {
				key: 'actions',
				size: 'big',
				textAlign: 'center',
				value: sortingEnabled ? '-' : <TicketActionsMenu entity={ticket} />,
			};

			const cellsData: Array<CellData> = [
				stripeCell,
				bulkActionCheckboxCell,
				idCell,
				nameCell,
				startCell,
				endCell,
				priceCell,
				quantityCell,
				soldCell,
				registrationsCell,
				actionsCell,
			].filter(
				// removes falsy values
				Boolean
			);

			const exclude = ['row', 'stripe', 'name', 'actions'];

			const cells = pipe(
				filter(filterCellByStartOrEndDate(displayStartOrEndDate)),
				addZebraStripesOnMobile(exclude)
			)(cellsData);

			return {
				cells,
				className: `ee-editor-date-list-view-row ${statusClassName}`,
				id: `ee-editor-date-list-view-row-${ticket.id}`,
				key: `row-${ticket.id}`,
				type: 'row',
			};
		},
		[getTicket, showBulkActions]
	);
};

export default useBodyRowGenerator;
