import { useMemo } from 'react';

import classNames from 'classnames';
import invariant from 'invariant';

import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';
import { enhanceCell } from './utils';

import type { TableHeaderProps } from './types';
import { RowType } from './types';

const TableHeader: React.FC<TableHeaderProps> = ({ headerRows, tableId, ...props }) => {
	const className = classNames(props.className.headerClassName, 'ee-rspnsv-table-header');
	const theadProps = useMemo<React.HTMLAttributes<HTMLElement>>(
		() => ({
			...props,
			className,
		}),
		[className, props]
	);

	return (
		<thead {...theadProps}>
			{headerRows.map((headerRow, rowNumber) => (
				<TableRow
					className={props.className}
					id={headerRow.id || `${tableId}-header`}
					headerRowClassName={headerRow.className || ''}
					key={`header-row-${rowNumber}`}
					rowData={headerRow}
					rowNumber={rowNumber}
					rowType={RowType.header}
				>
					{headerRow?.cells.map(enhanceCell).map((column, colNumber) => {
						invariant(
							column.hasOwnProperty('value'),
							`Missing "value" property for header column ${colNumber}.`
						);

						return typeof column?.render === 'function' ? (
							column.render({ rowNumber, colNumber, column })
						) : (
							<TableHeaderCell
								className={props.className}
								colNumber={colNumber}
								key={`row-${rowNumber}-col-${colNumber}`}
								rowNumber={rowNumber}
								rowType={RowType.header}
								id={column.id || `${tableId}-header-cell`}
								tableHeaderCellClassName={column.className}
							>
								{column.value || ''}
							</TableHeaderCell>
						);
					})}
				</TableRow>
			))}
		</thead>
	);
};

export default TableHeader;
