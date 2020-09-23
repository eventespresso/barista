import { renderHook } from '@testing-library/react-hooks';

import { ApolloMockedProvider } from '@eventespresso/edtr-services/src/context/test';
import { actWait } from '@eventespresso/utils/src/test';
import useAttendeesQueryOptions from '../useAttendeesQueryOptions';
import useAttendees from '../useAttendees';
import { errorMocks, successMocks, nodes } from './data';

const whereArgs = { event: 'xyz' };

describe('useAttendees', () => {
	it('checks for the error state', async () => {
		/* Set query options and the wrapper */
		const { result: queryResult } = renderHook(() => {
			return useAttendeesQueryOptions(whereArgs);
		});

		const wrapper = ApolloMockedProvider(errorMocks.map((mock) => ({ ...mock, request: queryResult.current })));
		/* Set query options and the wrapper */

		const { result } = renderHook(
			() => {
				return useAttendees(whereArgs);
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
			return useAttendeesQueryOptions(whereArgs);
		});

		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request: queryResult.current })));
		/* Set query options and the wrapper */

		const { result } = renderHook(
			() => {
				return useAttendees(whereArgs);
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
			return useAttendeesQueryOptions(whereArgs);
		});

		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request: queryResult.current })));
		/* Set query options and the wrapper */

		const { result } = renderHook(
			() => {
				return useAttendees(whereArgs);
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
			return useAttendeesQueryOptions(whereArgs);
		});

		const wrapper = ApolloMockedProvider(successMocks.map((mock) => ({ ...mock, request: queryResult.current })));
		/* Set query options and the wrapper */

		const { result } = renderHook(
			() => {
				return useAttendees(whereArgs);
			},
			{
				wrapper,
			}
		);

		await actWait();

		expect(result.current.data).toHaveProperty('espressoAttendees');

		// has nodes
		expect(result.current.data.espressoAttendees).toHaveProperty('nodes');

		// nodes is an array with `length` property
		expect(result.current.data.espressoAttendees.nodes).toHaveProperty('length');

		// `nodes` length is positive
		expect(result.current.data.espressoAttendees.nodes.length).toEqual(nodes.length);

		// nodes from cache are same as written to cache
		expect(result.current.data.espressoAttendees.nodes).toEqual(nodes);

		// the id of first entity is same
		expect(result.current.data.espressoAttendees.nodes[0].id).toEqual(nodes[0].id);
	});
});
