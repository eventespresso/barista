import type React from 'react';
import { PaginationProps as RcPaginationProps } from 'rc-pagination';

// LATER: some overlapping duplicate properties, maybe use common base?
// packages/ui-components/src/Pagination/types.ts
export interface PaginationProps
	extends Pick<RcPaginationProps, 'defaultCurrent' | 'itemRender' | 'onChange' | 'total'> {
	pageNumber: number;
	perPage: number;
	defaultPageNumber?: number;
	hideOnSinglePage?: boolean;
	locale?: Locale;
	perPageChanger: React.ReactNode;
	showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}

// LATER: duplicate
// packages/ui-components/src/Pagination/types.ts
export interface Locale {
	next_page: string;
	prev_page: string;
}
