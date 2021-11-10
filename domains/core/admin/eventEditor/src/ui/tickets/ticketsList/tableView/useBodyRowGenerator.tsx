import { useCallback } from 'react';
import classNames from 'classnames';
import { parseISO } from 'date-fns';
import * as R from 'ramda';

import { addZebraStripesOnMobile, CellData } from '@eventespresso/ui-components';
import { CurrencyDisplay } from '@eventespresso/ee-components';
import { filterCellByStartOrEndDate, useTickets, useLazyTicket } from '@eventespresso/edtr-services';
import { ENTITY_LIST_DATE_TIME_FORMAT } from '@eventespresso/constants';
import { useTimeZoneTime } from '@eventespresso/services';
import { getTicketBackgroundColorClassName, ticketStatus } from '@eventespresso/helpers';
import { findEntityByGuid } from '@eventespresso/predicates';
import type { EntityId } from '@eventespresso/data';
import type { BodyRowGeneratorFn } from '@eventespresso/ee-components';
import type { TicketsFilterStateManager } from '@eventespresso/edtr-services';

import TicketActionsMenu from '@edtrUI/tickets/ticketsList/actionsMenu/TicketActionsMenu';
import TicketQuantity from '../cardView/TicketQuantity';
import { EditableName } from '../editable';
import { TicketRegistrationsLink } from '../TicketRegistrationsLink';
import Checkbox from './Checkbox';

type TicketsTableBodyRowGen = BodyRowGeneratorFn<TicketsFilterStateManager>;

const useBodyRowGenerator = (): TicketsTableBodyRowGen => {
	const tickets = useTickets();
	const getTicket = useCallback((id: EntityId) => findEntityByGuid(tickets)(id), [tickets]);
	const getLazyTicket = useLazyTicket();
	const { formatForSite: format } = useTimeZoneTime();

	return useCallback<TicketsTableBodyRowGen>(
		({ entityId, filterState }) => {
			const ticket = getTicket(entityId) || getLazyTicket(entityId);
			const { displayStartOrEndDate, showBulkActions } = filterState;

			const bgClassName = getTicketBackgroundColorClassName(ticket);
			const id = ticket.dbId || 0;
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
				value: (
					<EditableName
						className='ee-entity-name ee-entity-list-text ee-focus-priority-5'
						data-testid={`ee-entity-list-view-row-editable-${ticket.dbId}`}
						entity={ticket}
						view='table'
					/>
				),
			};

			const startCell: CellData = {
				key: 'start',
				size: 'default',
				value: format(parseISO(ticket.startDate), ENTITY_LIST_DATE_TIME_FORMAT),
			};

			const endCell: CellData = {
				key: 'end',
				size: 'default',
				value: format(parseISO(ticket.endDate), ENTITY_LIST_DATE_TIME_FORMAT),
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
				value: <TicketQuantity entity={ticket} />,
			};

			const registrationsCell: CellData = {
				key: 'registrations',
				size: 'smaller',
				textAlign: 'center',
				value: <TicketRegistrationsLink ticket={ticket} />,
			};

			const actionsCell: CellData = {
				key: 'actions',
				size: 'big',
				textAlign: 'center',
				value: <TicketActionsMenu entity={ticket} />,
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

			const cells = R.pipe(
				R.filter(filterCellByStartOrEndDate(displayStartOrEndDate)),
				addZebraStripesOnMobile(exclude)
			)(cellsData);

			return {
				cells,
				className: `ee-editor-ticket-list-view-row ${statusClassName}`,
				'data-testid': `ee-ticket-list-view-row-${ticket.dbId}`,
				id: `ee-editor-ticket-list-view-row-${ticket.id}`,
				key: `row-${ticket.id}`,
				rowClassName: 'ee-entity-list-item',
				type: 'row',
			};
		},
		[format, getLazyTicket, getTicket]
	);
};

export default useBodyRowGenerator;
