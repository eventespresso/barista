import { useCallback } from 'react';

import type { BasicSortBy, EntityListFilterStateReducer } from './types';

const useStateReducer = <SortBy = BasicSortBy>(): EntityListFilterStateReducer<SortBy> => {
	return useCallback<EntityListFilterStateReducer<SortBy>>((state, action) => {
		const { type, perPage, pageNumber, total, searchText, sortBy, view } = action;

		switch (type) {
			case 'SET_SEARCH_TEXT':
				return { ...state, searchText };

			case 'SET_PER_PAGE':
				return { ...state, perPage };

			case 'SET_PAGE_NUMBER':
				return { ...state, pageNumber };

			case 'SET_TOTAL':
				return { ...state, total };

			case 'SET_SORT_BY':
				return { ...state, sortBy };

			case 'SET_VIEW':
				return { ...state, view };

			default:
				throw new Error('Unexpected action');
		}
	}, []);
};

export default useStateReducer;
