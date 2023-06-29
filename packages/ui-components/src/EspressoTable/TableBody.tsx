import { useMemo } from 'react';

import classNames from 'classnames';
import invariant from 'invariant';

import { enhanceCell } from './utils';
import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';
import TableDataCell from './TableDataCell';
import ResponsiveCell from './ResponsiveCell';

import { RowType } from './types';
import type { CellRenderer, TableBodyProps } from './types';

const TableBody: React.FC<TableBodyProps> = ({
	bodyRows,
	headerRowCount,
	hasRowHeaders,
	primaryHeader,
	tableId,
	...props
}) => {
	const tableCell: CellRenderer = ({ rowNumber, colNumber, column, cellData }) => {
		return hasRowHeaders && colNumber === 0 ? (
			<TableHeaderCell
				className={props.className}
				key={`row-${rowNumber}-col-${colNumber}`}
				rowNumber={rowNumber}
				colNumber={colNumber}
				rowType={RowType.body}
				id={cellData.id || `${tableId}-header-cell`}
				tableHeaderCellClassName={cellData.className}
			>
				{cellData.value || ''}
			</TableHeaderCell>
		) : (
			<TableDataCell
				className={props.className}
				colNumber={colNumber}
				id={cellData.id || `${tableId}-data-cell`}
				key={`row-${rowNumber}-col-${colNumber}`}
				rowNumber={rowNumber}
				rowType={RowType.body}
				tableDataCellClassName={cellData.className || ''}
			>
				<ResponsiveCell heading={column.value} value={cellData.value} />
			</TableDataCell>
		);
	};

	const tableBodyRows = bodyRows.map((row, rowNumber) => {
		return (
			<TableRow
				className={props.className}
				data-testid={row?.['data-testid']}
				headerRowCount={headerRowCount}
				id={row.id || `${tableId}-row`}
				key={`body-row-${row.key}`}
				rowData={row}
				rowClassName={row.rowClassName}
				rowNumber={rowNumber}
				rowType={RowType.body}
			>
				{row.cells &&
					row.cells.map(enhanceCell).map((cellData, colNumber) => {
						const column = primaryHeader.cells[colNumber];
						invariant(column !== undefined, `Missing data for column ${colNumber} in row ${rowNumber}.`);
						invariant(
							cellData.hasOwnProperty('value'),
							`Missing "value" property for table cell at row ${rowNumber} column ${colNumber}.`
						);

						if (cellData.render) {
							return cellData.render({ rowNumber, colNumber, column, cellData });
						}

						return tableCell({ rowNumber, colNumber, column, cellData });
					})}
			</TableRow>
		);
	});

	const className = classNames(props?.className?.bodyClassName, 'ee-rspnsv-table-body');

	const tableBodyProps = useMemo<React.HTMLAttributes<HTMLElement>>(
		() => ({
			...props,
			className,
		}),
		[className, props]
	);

	return <tbody {...tableBodyProps}>{tableBodyRows}</tbody>;
};

export default TableBody;
