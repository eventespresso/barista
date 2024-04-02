import { renderHook, act } from '@testing-library/react-hooks';

import { getDefaultPrices, getPriceModifiers } from '@eventespresso/predicates';
import { useDataState } from '../../data';
import useAddDefaultPrices from '../useAddDefaultPrices';
import TestWrapper from '../../data/test/TestWrapper';
import { actWait } from '@eventespresso/utils/src/test';
import { nodes as prices } from '@eventespresso/edtr-services/src/apollo/queries/prices/test/data';
import useInitPriceTestCache from '@eventespresso/edtr-services/src/apollo/queries/prices/test/useInitPriceTestCache';
import type { Price } from '@eventespresso/constants';

const defaultPrices = getDefaultPrices(prices);

describe('useAddDefaultPrices', () => {
	it('adds default prices to TPC data', async () => {
		// before doing anything, make sure we have a default price
		expect(defaultPrices.length).toBeGreaterThan(0);

		const { result } = renderHook(
			() => {
				return {
					dataState: useDataState(),
					addDefaultPrices: useAddDefaultPrices(),
				};
			},
			{
				wrapper: TestWrapper,
			}
		);
		await actWait();

		// Make sure the state is properly set before moving ahead
		act(() => {
			result.current.dataState.prices.forEach(({ id }) => {
				result.current.dataState.deletePrice(id);
			});
		});

		// there should be no prices.
		expect(result.current.dataState.prices).toEqual([]);

		// Do the thing
		act(() => {
			result.current.addDefaultPrices();
		});

		// there will be a base price, we need to exclude it
		const priceModifiers = getPriceModifiers(result.current.dataState.prices) as Array<Price>;

		expect(priceModifiers.length).toBeGreaterThan(0);

		// we need to make sure that default is not duplicated
		priceModifiers.forEach(({ isDefault }) => {
			expect(isDefault).toBe(false);
		});
	});

	it('does not add default prices to TPC data when there are no default prices', async () => {
		// before doing anything, make sure we have a default price
		expect(defaultPrices.length).toBeGreaterThan(0);

		const { result } = renderHook(
			() => {
				// set price to empty array in Apollo cache
				useInitPriceTestCache({ nodes: [], __typename: 'EspressoRootQueryPricesConnection' });
				return {
					dataState: useDataState(),
					addDefaultPrices: useAddDefaultPrices(),
				};
			},
			{
				wrapper: TestWrapper,
			}
		);
		await actWait();

		// Make sure the state is properly set before moving ahead
		act(() => {
			result.current.dataState.prices.forEach(({ id }) => {
				result.current.dataState.deletePrice(id);
			});
		});

		// there should be no prices.
		expect(result.current.dataState.prices).toEqual([]);

		// Do the thing
		act(() => {
			result.current.addDefaultPrices();
		});

		// there will be a base price, we need to exclude it
		const priceModifiers = getPriceModifiers(result.current.dataState.prices);

		expect(priceModifiers).toEqual([]);
	});
});
