import { renderHook } from '@testing-library/react-hooks';

import { ApolloMockedProvider } from '@eventespresso/edtr-services/src/context/test';
import { actWait } from '@eventespresso/utils/src/test';
import useEventsQueryOptions from '../useEventsQueryOptions';
import { useEvents } from '../useEvents';
import { errorMocks, successMocks, nodes } from './data';

describe('useEvents', () => {
	it('checks for the error state', async () => {
		/* Set query options and the wrapper */
		const { result: queryResult } = renderHook(() => {
			return useEventsQueryOptions();
		});
		await actWait();

		const wrapper = ApolloMockedProvider(
			errorMocks.map((mock) => ({
				...mock,
				request: {
					...queryResult.current,
					query: { ...queryResult.current, query: queryResult.current.query }.query,
				},
			}))
		);
		/* Set query options and the wrapper */

		const { result } = renderHook(
			() => {
				return useEvents();
			},
			{
				wrapper,
			}
		);

		expect(result.current.error).toBeUndefined();
		expect(result.current.data).toBeUndefined();

		await actWait();

		expect(result.current.error).toBeDefined();
		expect(result.current.data).toBeUndefined();
	});

	it('checks for the loading state', async () => {
		/* Set query options and the wrapper */
		const { result: queryResult } = renderHook(() => {
			return useEventsQueryOptions();
		});
		await actWait();

		const wrapper = ApolloMockedProvider(
			successMocks.map((mock) => ({
				...mock,
				request: { ...queryResult.current, query: queryResult.current.query },
			}))
		);
		/* Set query options and the wrapper */

		const { result } = renderHook(
			() => {
				return useEvents();
			},
			{
				wrapper,
			}
		);

		expect(result.current.loading).toBe(true);

		await actWait();

		expect(result.current.loading).toBe(false);
	});

	it('checks for the response data', async () => {
		/* Set query options and the wrapper */
		const { result: queryResult } = renderHook(() => {
			return useEventsQueryOptions();
		});
		await actWait();

		const wrapper = ApolloMockedProvider(
			successMocks.map((mock) => ({
				...mock,
				request: { ...queryResult.current, query: queryResult.current.query },
			}))
		);
		/* Set query options and the wrapper */

		const { result } = renderHook(
			() => {
				return useEvents();
			},
			{
				wrapper,
			}
		);

		expect(result.current.error).toBeUndefined();
		expect(result.current.data).toBeUndefined();

		await actWait();

		// Data is already written above
		expect(result.current.data).toBeDefined();
		expect(result.current.error).toBeUndefined();
	});

	it('checks for the entries in response data', async () => {
		/* Set query options and the wrapper */
		const { result: queryResult } = renderHook(() => {
			return useEventsQueryOptions();
		});
		await actWait();

		const wrapper = ApolloMockedProvider(
			successMocks.map((mock) => ({
				...mock,
				request: { ...queryResult.current, query: queryResult.current.query },
			}))
		);
		/* Set query options and the wrapper */

		const { result } = renderHook(
			() => {
				return useEvents();
			},
			{
				wrapper,
			}
		);

		await actWait();

		expect(result.current.data).toHaveProperty('espressoEvents');

		// has nodes
		expect(result.current.data.espressoEvents).toHaveProperty('nodes');

		// nodes is an array with `length` property
		expect(result.current.data.espressoEvents.nodes).toHaveProperty('length');

		// `nodes` length is positive
		expect(result.current.data.espressoEvents.nodes.length).toEqual(nodes.length);

		// nodes from cache are same as written to cache
		expect(result.current.data.espressoEvents.nodes).toEqual(nodes);

		// the id of first entity is same
		expect(result.current.data.espressoEvents.nodes[0].id).toEqual(nodes[0].id);
	});
});
