import type React from 'react';

export interface PaginationProps extends PerPageProps {
	alignment?: 'left' | 'right';
	defaultPageNumber?: number;
	hideOnSinglePage?: boolean;
	locale?: Locale;
	noHorizontalPadding?: boolean;
	onChangePageNumber: (pageNumber: number, perPage: number) => void;
	showPerPageChanger?: boolean;
	showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}

export type PerPageOptions = {
	[key: number]: string; // per page value (number) and translated label (string)
};

export interface PerPageProps {
	className?: string;
	defaultPerPage: number;
	onChangePerPage: (newPageNumber: number, newPerPage: number) => void;
	pageNumber: number;
	perPage: number;
	perPageOptions?: PerPageOptions;
	total: number;
}

// TODO: duplicate
// packages/adapters/src/Pagination/types.ts
export interface Locale {
	next_page: string;
	prev_page: string;
}
