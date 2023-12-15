import classNames from 'classnames';

import { Pagination as PaginationAdapter } from '@eventespresso/adapters';
import { DEFAULT_LOCALE, DEFAULT_PER_PAGE_OPTIONS } from './constants';
import ItemRender from './ItemRender';
import PerPage from './PerPage';
import type { PaginationProps } from './types';

import './style.scss';

export const Pagination: React.FC<PaginationProps> = ({
	alignment,
	defaultPageNumber = 1,
	defaultPerPage,
	hideOnSinglePage = true,
	locale = DEFAULT_LOCALE,
	noHorizontalPadding,
	onChangePageNumber,
	onChangePerPage,
	pageNumber,
	perPage,
	perPageOptions = DEFAULT_PER_PAGE_OPTIONS,
	showPerPageChanger,
	total,
	...props
}) => {
	const className = classNames(
		'ee-pagination',
		alignment && `ee-pagination--align-${alignment}`,
		noHorizontalPadding && `ee-pagination--no-horizontal-padding`,
		props.className
	);

	const perPageChanger = showPerPageChanger && (
		<PerPage
			defaultPerPage={defaultPerPage}
			onChangePerPage={onChangePerPage}
			pageNumber={pageNumber}
			perPage={perPage}
			perPageOptions={perPageOptions}
			total={total}
		/>
	);

	return (
		<div className={className}>
			<PaginationAdapter
				pageNumber={pageNumber}
				defaultCurrent={defaultPageNumber}
				hideOnSinglePage={hideOnSinglePage}
				itemRender={ItemRender}
				locale={locale}
				onChange={onChangePageNumber}
				perPage={perPage}
				perPageChanger={perPageChanger}
				total={total}
			/>
		</div>
	);
};
