import { renderHook } from '@testing-library/react-hooks';

import useMoneyDisplay from '../useMoneyDisplay';
import { mockEspressoDomData } from '@eventespresso/config/src/test/data';
import { ApolloMockedProvider } from '@eventespresso/edtr-services/src/context/test';
import { actWait } from '@eventespresso/utils/src/test';

describe('useMoneyDisplay', () => {
	const wrapper = ApolloMockedProvider();

	it('checks for existence of properties', async () => {
		const { result } = renderHook(() => useMoneyDisplay(), { wrapper });

		await actWait();

		expect(result.current).toHaveProperty('beforeAmount');
		expect(result.current).toHaveProperty('afterAmount');
		expect(result.current).toHaveProperty('currency');
		expect(result.current).toHaveProperty('formatAmount');
	});

	it('checks for returned properties data', async () => {
		const { result } = renderHook(() => useMoneyDisplay(), { wrapper });

		await actWait();

		expect(result.current.formatAmount).toBeInstanceOf(Function);

		expect(result.current.currency).toEqual(mockEspressoDomData.config.siteCurrency);
	});
});
