import { renderHook } from '@testing-library/react-hooks';

import useRecurrenceIds from '../useRecurrenceIds';
import { ApolloMockedProvider } from '@eventespresso/edtr-services/src/context/test';
import { nodes } from './data';
import useInitRecurrenceTestCache from './useInitRecurrenceTestCache';
import { getGuids } from '@eventespresso/predicates';

const timeout = 5000; // milliseconds
describe('useRecurrenceIds()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty recurrence IDs', async () => {
		const { result, waitForValueToChange } = renderHook(() => useRecurrenceIds(), { wrapper });

		await waitForValueToChange(() => result.current, { timeout });
		expect(result.current.length).toBe(0);
	});

	it('checks for recurrence IDs after the cache is updated', async () => {
		const { result, waitForValueToChange } = renderHook(
			() => {
				useInitRecurrenceTestCache();
				return useRecurrenceIds();
			},
			{ wrapper }
		);
		await waitForValueToChange(() => result.current, { timeout });

		const { current: cachedRecurrenceIds } = result;
		const passedRecurrenceIds = getGuids(nodes);

		expect(cachedRecurrenceIds.length).toEqual(passedRecurrenceIds.length);

		expect(cachedRecurrenceIds).toEqual(passedRecurrenceIds);

		expect(cachedRecurrenceIds).toEqual(expect.arrayContaining(passedRecurrenceIds));
	});
});
