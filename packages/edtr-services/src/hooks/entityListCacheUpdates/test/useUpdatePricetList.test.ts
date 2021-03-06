import { useApolloClient } from '@eventespresso/data';
import { renderHook, act } from '@testing-library/react-hooks';

import { useCacheRehydration } from '../../../apollo/initialization';
import useUpdatePriceList from '../useUpdatePriceList';
import { usePriceQueryOptions, usePrices } from '../../../apollo/queries';
import { ApolloMockedProvider } from '../../../context/test';
import { getGuids } from '@eventespresso/predicates';
import { actWait } from '@eventespresso/utils/src/test';

describe('useUpdatePriceList', () => {
	it('checks for prices cache update', async () => {
		const wrapper = ApolloMockedProvider();
		const { result } = renderHook(
			() => {
				useCacheRehydration();
				return {
					queryOptions: usePriceQueryOptions(),
					pricelist: usePrices(),
					cacheUpdater: useUpdatePriceList(),
					client: useApolloClient(),
				};
			},
			{
				wrapper,
			}
		);
		await actWait();

		const pricelist = result.current.pricelist;

		const price = { ...pricelist[0], id: pricelist[0].id + '-alpha' };

		// add price to the list.
		const nodes = [...pricelist, price];

		act(() => {
			result.current.cacheUpdater({
				...result.current.queryOptions,
				data: {
					espressoPrices: {
						__typename: 'EspressoRootQueryPricesConnection',
						nodes,
					},
				},
			});
		});

		const cache = result.current.client.extract();
		const { result: cacheResult } = renderHook(
			() => {
				const client = useApolloClient();
				// restore the cache from previous render
				client.restore(cache);
				return usePrices();
			},
			{
				wrapper,
			}
		);
		await actWait();

		const cachedPriceIds = getGuids(cacheResult.current);

		expect(cachedPriceIds.length).toBe(pricelist.length + 1);

		expect(cachedPriceIds).toContain(price.id);
	});
});
