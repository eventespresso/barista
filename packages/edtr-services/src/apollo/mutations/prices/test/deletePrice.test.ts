import { renderHook, act } from '@testing-library/react-hooks';
import { path } from 'ramda';

import { useRelations } from '@eventespresso/services';
import { MutationType } from '@eventespresso/data';
import { ApolloMockedProvider } from '../../../../context/test';
import { getMutationMocks, mockedPrices } from './data';
import { nodes as tickets } from '../../../queries/tickets/test/data';
import { usePriceMutator } from '../';
import { getGuids } from '@eventespresso/predicates';
import { actWait } from '@eventespresso/utils/src/test';

describe('deletePrice', () => {
	const mockedPrice = mockedPrices.DELETE;

	const ticketIds = getGuids(tickets);

	let mutationMocks = getMutationMocks({}, MutationType.Delete);

	const { result: mockResult } = mutationMocks[0];

	it('checks for the mutation data to be same as the mock data', async () => {
		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result } = renderHook(() => usePriceMutator(mockedPrice.id), {
			wrapper,
		});

		let mutationData: any;

		act(() => {
			result.current.deleteEntity().then(({ data }) => {
				mutationData = data;
			});
		});

		// wait for mutation promise to resolve
		await actWait();

		expect(mutationData).toEqual(mockResult.data);
		const pathToId = ['deleteEspressoPrice', 'espressoPrice', 'name'];

		const idFromMutationData = path(pathToId, mutationData);
		const idFromMockData = path(pathToId, mockResult.data);

		expect(idFromMutationData).toEqual(idFromMockData);
	});

	it('checks for ticket relation update after mutation - trash', async () => {
		// Add related ticket Ids to the mutation input
		mutationMocks = getMutationMocks({}, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult } = renderHook(
			() => ({
				mutator: usePriceMutator(mockedPrice.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		await actWait();

		act(() => {
			mutationResult.current.mutator.deleteEntity({});
		});

		// wait for mutation promise to resolve
		await actWait();

		const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
			entity: 'prices',
			entityId: mockedPrice.id,
			relation: 'tickets',
		});

		expect(relatedTicketIds.length).toBe(1);
	});

	it('checks for ticket relation update after mutation - permanent delete', async () => {
		const testInput = { deletePermanently: true };

		// Add related ticket Ids to the mutation input
		mutationMocks = getMutationMocks(testInput, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult } = renderHook(
			() => ({
				mutator: usePriceMutator(mockedPrice.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		await actWait();

		await act(async () => {
			await mutationResult.current.mutator.deleteEntity(testInput);
		});

		const relatedTicketIds = mutationResult.current.relationsManager.getRelations({
			entity: 'prices',
			entityId: mockedPrice.id,
			relation: 'tickets',
		});

		expect(relatedTicketIds.length).toBe(0);

		// check if all the passed tickets are related to the price
		ticketIds.forEach((ticketId) => {
			const relatedPriceIds = mutationResult.current.relationsManager.getRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'prices',
			});

			expect(relatedPriceIds).not.toContain(mockedPrice.id);
		});
	});

	it('checks for priceType relation update after mutation - trash', async () => {
		mutationMocks = getMutationMocks({}, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult } = renderHook(
			() => ({
				mutator: usePriceMutator(mockedPrice.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		await actWait();

		act(() => {
			mutationResult.current.mutator.deleteEntity({});
		});

		// wait for mutation promise to resolve
		await actWait();

		const relatedPriceTypeIds = mutationResult.current.relationsManager.getRelations({
			entity: 'prices',
			entityId: mockedPrice.id,
			relation: 'priceTypes',
		});

		expect(relatedPriceTypeIds.length).toBe(1);
	});

	it('checks for priceType relation update after mutation - permanent delete', async () => {
		const testInput = { deletePermanently: true };

		mutationMocks = getMutationMocks(testInput, MutationType.Delete);

		const wrapper = ApolloMockedProvider(mutationMocks);

		const { result: mutationResult } = renderHook(
			() => ({
				mutator: usePriceMutator(mockedPrice.id),
				relationsManager: useRelations(),
			}),
			{
				wrapper,
			}
		);

		await actWait();

		await act(async () => {
			await mutationResult.current.mutator.deleteEntity(testInput);
		});

		// wait for mutation promise to resolve
		await actWait();

		const relatedPriceTypeIds = mutationResult.current.relationsManager.getRelations({
			entity: 'prices',
			entityId: mockedPrice.id,
			relation: 'priceTypes',
		});

		expect(relatedPriceTypeIds.length).toBe(0);
	});
});
