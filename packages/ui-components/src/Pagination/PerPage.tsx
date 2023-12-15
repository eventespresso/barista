import { useCallback } from 'react';

import { sprintf, __ } from '@eventespresso/i18n';
import { Select, SelectProps } from '@eventespresso/adapters';
import { PerPageProps } from './types';

import './style.scss';

const calculatePageNumber = (newPerPage: number, prevPerPage: number, total: number): number => {
	const perPage = typeof newPerPage === 'undefined' ? prevPerPage : newPerPage;
	return Math.floor((total - 1) / perPage) + 1;
};

const selectRootProps = { className: 'ee-select-wrapper ee-pagination__per-page-select-wrapper' };

const PerPage: React.FC<PerPageProps> = ({ onChangePerPage, pageNumber, perPage, perPageOptions, total }) => {
	const onChangeValue = useCallback<SelectProps['onChangeValue']>(
		(newPerPage) => {
			const parsedNewPerPage = parseInt(newPerPage as string, 10);
			const newPageNumber = calculatePageNumber(parsedNewPerPage as number, perPage, total);
			let pageNum = pageNumber > newPageNumber ? newPageNumber : pageNumber;
			// fix the issue:
			// Once 'total' is 0, 'pageNumber' in 'onChangePerPage' is 0, which is not correct.
			if (newPageNumber === 0) {
				pageNum = pageNumber;
			}

			if (typeof onChangePerPage === 'function') {
				onChangePerPage(pageNum, parsedNewPerPage as number);
			}
		},
		[onChangePerPage, pageNumber, perPage, total]
	);

	// Calculate the lower and upper limits of the items being displayed
	// page 10 x 10 items per page
	const maxLimit = pageNumber * perPage;
	// cap if total is less than maxLimit
	const upperLimit = maxLimit > total ? total : maxLimit;
	const lowerLimit = maxLimit - perPage + 1;
	const showingAll = perPage === 9999 || perPage >= total;

	const totalItemsText = sprintf(
		/* translators: %1$d is first item #, %2$d is last item #, %3$d is total items, ex: 20-30 of 100 items */
		__('%1$d-%2$d of %3$d items'),
		showingAll ? 1 : lowerLimit,
		showingAll ? total : upperLimit,
		total
	);

	return (
		<div className='ee-pagination__per-page-wrapper'>
			<Select
				aria-label={__('items per page')}
				className='ee-select ee-pagination__per-page'
				onChangeValue={onChangeValue}
				rootProps={selectRootProps}
				value={perPage}
				variant='unstyled'
			>
				{Object.entries(perPageOptions).map(([value, label]) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</Select>
			<div className='ee-pagination__total-items'>{totalItemsText}</div>
		</div>
	);
};

export default PerPage;
