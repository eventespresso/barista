import { useRef } from 'react';

import classNames from 'classnames';

import { isEmpty, useMemoStringify, uuid } from '@eventespresso/utils';
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

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
	bodyRows = EMPTY_ARRAY,
	className,
	footerRows = EMPTY_ARRAY,
	headerRows = EMPTY_ARRAY,
	metaData,
	...props
}) => {
	const primaryHeader = headerRows.find((row) => row.primary === true);
	// avoid the ID getting changed on every render
	const defaultId = useRef(uuid()).current;
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

	return (
		<div className={wrapperClassName}>
			<Table
				captionID={captionID}
				captionText={tableCaption}
				className={cssClasses.tableClassName}
				tableId={tableId}
			>
				<TableHeader className={cssClasses} headerRows={headerRows} tableId={tableId} />
				<TableBody
					bodyRows={bodyRows}
					className={cssClasses}
					hasRowHeaders={hasRowHeaders}
					headerRowCount={headerRowCount}
					primaryHeader={primaryHeader}
					tableId={tableId}
				/>
				<TableFooter
					className={cssClasses}
					footerRows={footerRows}
					tableId={tableId}
					rowCount={headerRowCount + tableRowCount}
				/>
			</Table>
		</div>
	);
};
