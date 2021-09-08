import { renderHook, act } from '@testing-library/react-hooks';
import * as R from 'ramda';

import { MutationType } from '@eventespresso/data';
import { ApolloMockedProvider } from '@eventespresso/edtr-services/src/context/test';
import { getMutationMocks, mockedRecurrences } from './data';
import { useRecurrenceMutator } from '../';
import { actWait } from '@eventespresso/utils/src/test';

describe('deleteRecurrence', () => {
	const mockedRecurrence = mockedRecurrences.DELETE;

	const mutationMocks = getMutationMocks({}, MutationType.Delete);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result } = renderHook(() => useRecurrenceMutator(mockedRecurrence.id), {
			wrapper,
		});

		let mutationData: any;

		act(() => {
			result.current.deleteEntity().then(({ data }) => {
				mutationData = data;
			});
		});

		await actWait();

		const pathToId = ['deleteEspressoRecurrence', 'espressoRecurrence', 'id'];

		const idFromMutationData = R.path(pathToId, mutationData);
		const idFromMockData = R.path(pathToId, mockResult.data);

		expect(idFromMutationData).toEqual(idFromMockData);
	});
});
