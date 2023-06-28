import classNames from 'classnames';
import invariant from 'invariant';

import { isFunc, isEmpty } from '@eventespresso/utils';

import TableRow from './TableRow';
import TableDataCell from './TableDataCell';
import TableHeaderCell from './TableHeaderCell';
import { enhanceCell } from './utils';

import { RowType } from './types';
import type { TableFooterProps } from './types';

const TableFooter: React.FC<TableFooterProps> = ({ tableId, footerRows, rowCount, ...props }) => {
	const className = classNames(props?.className?.footerClassName, 'ee-rspnsv-table-footer');

	return !isEmpty(footerRows) ? (
		<tfoot className={className}>
			{footerRows.map((footerRow, index) => {
				const rowNumber = index + rowCount;

				return (
					<TableRow
						rowData={footerRow}
						key={`row-${rowNumber}`}
						rowNumber={rowNumber}
						rowType={RowType.footer}
						id={footerRow.id || `${tableId}-footer`}
						rowClassName={footerRow.footerRowClassName}
						className={props.className}
					>
						{footerRow.cells.map(enhanceCell).map((column, colNumber) => {
							invariant(
								column.hasOwnProperty('value'),
								`Missing "value" property for footer column ${colNumber}.`
							);

							const cell =
								column.as === 'td' ? (
									<TableDataCell
										className={props.className}
										colNumber={colNumber}
										id={column.id || `${tableId}-footer-cell`}
										key={`row-${rowNumber}-col-${colNumber}`}
										rowNumber={rowNumber}
										rowType={RowType.footer}
										tableDataCellClassName={column.className || ''}
									>
										{column.value || ''}
									</TableDataCell>
								) : (
									<TableHeaderCell
										className={props.className}
										colNumber={colNumber}
										id={column.id || `${tableId}-footer-cell`}
										key={`row-${rowNumber}-col-${colNumber}`}
										rowNumber={rowNumber}
										rowType={RowType.footer}
										scope={column.scope}
										tableHeaderCellClassName={column.className}
									>
										{column.value || ''}
									</TableHeaderCell>
								);

							return isFunc(column.render) ? column.render({ rowNumber, colNumber, column }) : cell;
						})}
					</TableRow>
				);
			})}
		</tfoot>
	) : null;
};

export default TableFooter;
