import { useCallback } from 'react';
import type { ExecutionResult } from 'graphql';

import type { EntityId } from '@eventespresso/constants';
import type { PriceEdge } from '../../types';
import { usePrices, usePriceQueryOptions } from '../../queries';
import { useUpdatePriceList } from '../../../hooks';
import useBulkDeleteEntities from '../useBulkDeleteEntities';
import { TypeName, cacheNodesFromBulkDelete } from '../';

type Callback<R = void> = (entityIds: Array<EntityId>) => R;

const useBulkDeletePrices = (): Callback<Promise<ExecutionResult>> => {
	const allPrices = usePrices();
	const queryOptions = usePriceQueryOptions();
	const updatePriceList = useUpdatePriceList();

	const bulkDelete = useBulkDeleteEntities({ entityType: 'PRICE', typeName: TypeName.Price });

	const updateEntityList = useCallback<Callback<VoidFunction>>(
		(entityIds) => () => {
			// pass true to deletePermanently, because prices are not trashable
			const nodes = cacheNodesFromBulkDelete(entityIds, allPrices, true);

			const espressoPrices: PriceEdge = {
				nodes,
				__typename: 'EspressoRootQueryPricesConnection',
			};
			updatePriceList({
				...queryOptions,
				data: {
					espressoPrices,
				},
			});
		},
		[allPrices, queryOptions, updatePriceList]
	);

	return useCallback(
		async (entityIds) => {
			return await bulkDelete({
				entityIds,
				updateEntityList: updateEntityList(entityIds),
			});
		},
		[bulkDelete, updateEntityList]
	);
};

export default useBulkDeletePrices;
