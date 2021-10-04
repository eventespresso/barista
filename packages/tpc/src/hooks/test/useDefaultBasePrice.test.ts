import { renderHook } from '@testing-library/react-hooks';

import useDefaultBasePrice from '../useDefaultBasePrice';
import TestWrapper from '../../data/test/TestWrapper';
import { actWait } from '@eventespresso/utils/src/test';
import useInitPriceTypeTestCache from '@eventespresso/edtr-services/src/apollo/queries/priceTypes/test/useInitPriceTypeTestCache';

describe('useDefaultBasePrice', () => {
	it('returns the default base price when a base price type exists', async () => {
		const { result } = renderHook(
			() => {
				return useDefaultBasePrice();
			},
			{
				wrapper: TestWrapper,
			}
		);
		await actWait();

		expect(result.current.isBasePrice).toBe(true);
	});

	it('returns undefined when no base price type exists', async () => {
		const { result } = renderHook(
			() => {
				useInitPriceTypeTestCache({ nodes: [], __typename: 'EspressoRootQueryPriceTypesConnection' });
				return useDefaultBasePrice();
			},
			{
				wrapper: TestWrapper,
			}
		);
		await actWait();

		expect(result.current.isBasePrice).toBeUndefined();
	});
});
