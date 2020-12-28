import { useRef } from 'react';

import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { useMemoStringify } from '@eventespresso/hooks';
import { isFunc, isEmpty } from '@eventespresso/utils';
import Table from './Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

import type { ResponsiveTableProps } from './types';

import './style/index.scss';
import './style/laptop-style.scss';
import './style/tablet-style.scss';
import './style/phone-style.scss';

const EMPTY_ARRAY = [];

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
	bodyRows = EMPTY_ARRAY,
	className,
	footerRows = EMPTY_ARRAY,
	headerRows = EMPTY_ARRAY,
	metaData,
	onBeforeDragStart,
	onDragEnd,
	onDragStart,
	onDragUpdate,
	...props
}) => {
	console.log(headerRows);
	const primaryHeader = headerRows.find((row) => row.primary === true);
	// avoid the ID getting changed on every render
	const defaultId = useRef(uuidv4()).current;
	const instanceId = props.instanceId || defaultId;
	const isScrollable = !!metaData?.isScrollable;
	const hasRowHeaders = !!metaData?.hasRowHeaders;

	const tableClassName = classNames(
		className?.tableClassName,
		`ee-rspnsv-table-column-count-${primaryHeader.cells.length}`,
		hasRowHeaders && 'ee-rspnsv-table-has-row-headers'
	);

	const wrapperClassName = classNames(
		className?.tableClassName,
		'ee-rspnsv-table__outer_wrapper',
		isScrollable && 'ee-rspnsv-table__is-scrollable'
	);

	const cssClasses = useMemoStringify({
		headerClassName: className?.headerClassName || '',
		headerRowClassName: className?.headerRowClassName || '',
		headerThClassName: className?.headerThClassName || '',
		bodyClassName: className?.bodyClassName || '',
		bodyRowClassName: className?.bodyRowClassName || '',
		bodyThClassName: className?.bodyThClassName || '',
		bodyTdClassName: className?.bodyTdClassName || '',
		footerClassName: className?.footerClassName || '',
		footerRowClassName: className?.footerRowClassName || '',
		footerThClassName: className?.footerThClassName || '',
		tableClassName,
	});

	if (!primaryHeader || isEmpty(bodyRows)) {
		return null;
	}

	const tableId = metaData?.tableId || `ee-rspnsv-table-${instanceId}`;
	const tableCaption = metaData.tableCaption;
	const captionID = `${tableId}-caption`;
	const headerRowCount = headerRows.length;
	const tableRowCount = bodyRows.length;
	const showDragHandle = props.showDragHandle && isFunc(onDragEnd);

	return (
		<div className={wrapperClassName}>
			<Table
				captionID={captionID}
				captionText={tableCaption}
				className={cssClasses.tableClassName}
				tableId={tableId}
			>
				<TableHeader
					className={cssClasses}
					headerRows={headerRows}
					showDragHandle={showDragHandle}
					tableId={tableId}
				/>
				<TableBody
					bodyRows={bodyRows}
					className={cssClasses}
					hasRowHeaders={hasRowHeaders}
					headerRowCount={headerRowCount}
					onBeforeDragStart={onBeforeDragStart}
					onDragStart={onDragStart}
					onDragUpdate={onDragUpdate}
					onDragEnd={onDragEnd}
					primaryHeader={primaryHeader}
					showDragHandle={showDragHandle}
					tableId={tableId}
				/>
				<TableFooter
					className={cssClasses}
					footerRows={footerRows}
					tableId={tableId}
					rowCount={headerRowCount + tableRowCount}
					showDragHandle={showDragHandle}
				/>
			</Table>
		</div>
	);
};

export default ResponsiveTable;
