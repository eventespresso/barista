import React from 'react';
import RcPagination from 'rc-pagination';

import 'rc-pagination/assets/index.css';
import defaultLocale from 'rc-pagination/lib/locale/en_US';
import './style.scss';

import { ChevronLeft, ChevronRight } from '@eventespresso/icons';

import defaultItemRender from './ItemRender';
import type { PaginationProps } from './types';
import PerPage from './PerPage';

const DEFAULT_PER_PAGE_OPTIONS = ['2', '6', '12', '24', '48'];

const Pagination: React.FC<PaginationProps> = ({
	defaultPageNumber = 1,
	defaultPerPage,
	hideOnSinglePage = true,
	locale = defaultLocale,
	onChangePageNumber,
	onChangePerPage,
	pageNumber,
	perPage,
	perPageOptions = DEFAULT_PER_PAGE_OPTIONS,
	showPerPageChanger,
	total,
	...props
}) => {
	return (
		<div className='ee-pagination'>
			<RcPagination
				{...props}
				current={pageNumber}
				defaultCurrent={defaultPageNumber}
				hideOnSinglePage={hideOnSinglePage}
				itemRender={defaultItemRender}
				locale={locale}
				nextIcon={<ChevronRight size='small' />}
				onChange={onChangePageNumber}
				pageSize={perPage}
				prevIcon={<ChevronLeft size='small' />}
				showSizeChanger={false}
				total={total}
			/>
			{showPerPageChanger && (
				<PerPage
					defaultPerPage={defaultPerPage}
					locale={locale}
					onChangePerPage={onChangePerPage}
					pageNumber={pageNumber}
					perPage={perPage}
					perPageOptions={perPageOptions}
					total={total}
				/>
			)}
		</div>
	);
};

export default Pagination;
