import { useMemo } from 'react';
import classNames from 'classnames';

import type { BodyRow, CellData } from '@eventespresso/ui-components';

import BodyCell from './BodyCell';
import DateCell from './DateCell';
import { useDataState } from '../../data';
import useRowClassName from './useRowClassName';
import useColClassName from './useColClassName';
import type { DatesAndTickets, RelationClassName } from '../../types';

const useGetBodyRows = ({ datetimes, tickets }: DatesAndTickets): BodyRow[] => {
	const { getAssignmentStatus } = useDataState();

	const getRowClass = useRowClassName();
	const getColClass = useColClassName();

	return useMemo(() => {
		return datetimes.map((datetime) => {
			const datetimeCell: CellData = {
				className: 'ee-rspnsv-table-column-micro date-cell',
				key: 'datetime',
				value: <DateCell datetime={datetime} />,
			};

			const cells: Array<CellData> = tickets.map((ticket) => {
				const status = getAssignmentStatus({ datetimeId: datetime.id, ticketId: ticket.id });
				const statusClassName = status && (`${status.toLowerCase()}-assignment` as RelationClassName);

				const className = classNames('relation-cell', statusClassName, getColClass(ticket));

				const cell: CellData = {
					className,
					key: ticket.id,
					size: 'huge',
					textAlign: 'center',
					value: <BodyCell datetime={datetime} ticket={ticket} />,
				};

				return cell;
			});

			return {
				cells: [datetimeCell, ...cells],
				className: { bodyRowClassName: 'ee-ticket-assignments-manager-table-body-row' },
				rowClassName: getRowClass(datetime),
				key: datetime.id,
				primary: true,
				type: 'row',
			};
		});
	}, [datetimes, getAssignmentStatus, getColClass, getRowClass, tickets]);
};

export default useGetBodyRows;
