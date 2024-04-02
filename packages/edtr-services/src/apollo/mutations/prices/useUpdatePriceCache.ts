import { useCallback } from 'react';
import { findIndex, update } from 'ramda';

import { WriteQueryOptions } from '@eventespresso/data';
import { entityHasGuid } from '@eventespresso/predicates';
import { usePriceQueryOptions } from '../../queries';

import type { CacheUpdaterFn, CacheUpdaterFnArgs } from '../types';
import type { Price } from '@eventespresso/constants';
import type { PricesList } from '../../';

const useUpdatePriceCache = (): CacheUpdaterFn => {
	const queryOptions = usePriceQueryOptions();

	const updatePriceCache = useCallback(
		({ cache, prices, price, action }: CacheUpdaterFnArgs): void => {
			const { nodes = [] } = prices;
			let newNodes: Array<Price> = [],
				priceIndex: number;
			switch (action) {
				case 'add':
					newNodes = [...nodes, price];
					break;
				case 'update':
					// find the index of the price to update
					priceIndex = findIndex(entityHasGuid(price.id), nodes);
					// if price exists
					if (priceIndex >= 0) {
						newNodes = update(priceIndex, price, nodes);
					}
					break;
				case 'remove':
					newNodes = nodes.filter(({ id }) => id !== price.id);
					break;
				default:
					newNodes = nodes;
					break;
			}

			// write the data to cache without
			// mutating the cache directly
			const writeOptions: WriteQueryOptions = {
				...queryOptions,
				data: {
					espressoPrices: {
						...prices,
						nodes: newNodes,
					},
				},
			};
			cache.writeQuery<PricesList>(writeOptions);
		},
		[queryOptions]
	);

	return updatePriceCache;
};

export default useUpdatePriceCache;
