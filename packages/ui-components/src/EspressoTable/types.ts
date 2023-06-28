import type { AnyObject } from 'react-final-form';
import type { Size } from '../';

export interface Cell {
	as?: 'td';
	className?: string;
	id?: string;
	key: string;
	render?: CellRenderer;
	scope?: 'col' | 'row';
	type: string;
	value?: React.ReactNode | string;
}

export interface CellData extends Omit<Cell, 'type'>, Size {
	showValueOnMobile?: boolean;
	textAlign?: 'center' | 'end';
}

interface CellRender {
	rowNumber: number;
	colNumber: number;
	column: ResponsiveCellProps;
	cellData: CellData;
}

export type CellRenderer = (props: CellRender) => JSX.Element;

export interface FooterRow {
	cells: CellData[];
	footerRowClassName?: string;
	id?: string;
}

export interface HeaderRow {
	cells: CellData[];
	children?: React.ReactNode;
	className?: string;
	extraProps?: AnyObject;
	id?: string;
	key: string;
	primary: boolean;
	type: string;
}

export interface ResponsiveCellProps {
	heading: React.ReactNode | string;
	value: React.ReactNode | string;
}

export interface ResponsiveTableProps {
	bodyRows: BodyRow[];
	className?: TableClassName;
	footerRows?: FooterRow[];
	headerRows: HeaderRow[];
	instanceId?: string;
	metaData: {
		tableCaption: string;
		tableId?: string;
		hasRowHeaders?: boolean;
		isScrollable?: boolean;
	};
}

export enum RowType {
	body = 'body',
	footer = 'footer',
	header = 'header',
}

export interface TableProps {
	captionID: string;
	captionText: string;
	children: React.ReactNode;
	className?: string;
	tableId?: string;
}

export interface TableBodyProps {
	bodyRows: BodyRow[];
	className: TableClassName;
	headerRowCount: number;
	hasRowHeaders: boolean;
	primaryHeader: any;
	tableId: TableId;
}

interface TableClassName {
	headerClassName?: string;
	headerRowClassName?: string;
	headerThClassName?: string;
	bodyClassName?: string;
	bodyRowClassName?: string;
	bodyThClassName?: string;
	bodyTdClassName?: string;
	footerClassName?: string;
	footerRowClassName?: string;
	footerThClassName?: string;
	tableClassName?: string;
}

export interface TableDataCellProps {
	children: React.ReactNode;
	className: TableClassName;
	colNumber: number;
	id?: string;
	htmlClassName?: string;
	rowNumber: number;
	rowType: RowType;
	tableDataCellClassName?: string;
}

export interface TableFooterProps {
	className: TableClassName;
	footerRows: FooterRow[];
	tableId: string;
	rowCount: number;
}

export interface TableHeaderProps {
	className: TableClassName;
	headerRows: HeaderRow[];
	tableId: TableId;
}

export interface TableHeaderCellProps {
	className: TableClassName;
	colNumber: number;
	id?: string;
	// WAI-ARIA
	role?: string;
	rowNumber: number;
	rowType?: RowType;
	scope?: string;
	tableHeaderCellClassName?: string;
}

export interface BodyRow {
	cells?: CellData[];
	children?: React.ReactNode;
	className?: TableClassName;
	'data-testid'?: string;
	headerRows?: HeaderRow[];
	headerRowClassName?: string;
	headerRowCount?: number;
	id?: string;
	key: string;
	rowData?: any;
	rowClassName?: string;
	rowNumber?: number;
	rowType?: RowType;
	sortable?: boolean;
	type?: string;
}

export type TableRow = BodyRow | FooterRow | HeaderRow;

type TableId = string;
