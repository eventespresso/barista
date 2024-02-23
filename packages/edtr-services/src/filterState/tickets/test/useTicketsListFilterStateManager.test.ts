import { act, renderHook } from '@testing-library/react-hooks';

import { DisplayStartOrEndDate } from '@eventespresso/edtr-services';
import useTicketsListFilterStateManager from '../useTicketsListFilterStateManager';
import { TicketsSalesFilters, TicketsStatusFilters } from '@eventespresso/predicates';
import wrapper from './Wrapper';
import { actWait } from '@eventespresso/utils/src/test';

describe('useTicketsListFilterStateManager', () => {
	test('useTicketsListFilterStateManager initial state and result', async () => {
		const { result } = renderHook(() => useTicketsListFilterStateManager(), { wrapper });
		await actWait();

		expect(typeof result.current.sortBy).toBe('string');
		expect(typeof result.current.displayStartOrEndDate).toBe('string');

		expect(typeof result.current.setSortBy).toBe('function');
		expect(typeof result.current.setDisplayStartOrEndDate).toBe('function');
		expect(typeof result.current.setSales).toBe('function');
		expect(typeof result.current.setStatus).toBe('function');
		expect(result.current.isChained).toBe(true);
	});

	test('should update sortBy by invoking setSortBy with corresponding accepted enums', async () => {
		const { result } = renderHook(() => useTicketsListFilterStateManager(), { wrapper });
		await actWait();

		act(() => {
			result.current.setSortBy('name');
		});
		expect(result.current.sortBy).toBe('name');

		act(() => {
			result.current.setSortBy('id');
		});
		expect(result.current.sortBy).toBe('id');

		act(() => {
			result.current.setSortBy('order');
		});
		expect(result.current.sortBy).toBe('order');

		act(() => {
			result.current.setSortBy('date');
		});
		expect(result.current.sortBy).toBe('date');
	});

	test('should update displayStartOrEndDate by invoking setDisplayStartOrEndDate with corresponding accepted enums', async () => {
		const { result } = renderHook(() => useTicketsListFilterStateManager(), { wrapper });
		await actWait();

		act(() => {
			result.current.setDisplayStartOrEndDate(DisplayStartOrEndDate.start);
		});
		expect(result.current.displayStartOrEndDate).toBe('start');

		act(() => {
			result.current.setDisplayStartOrEndDate(DisplayStartOrEndDate.end);
		});
		expect(result.current.displayStartOrEndDate).toBe('end');

		act(() => {
			result.current.setDisplayStartOrEndDate(DisplayStartOrEndDate.both);
		});
		expect(result.current.displayStartOrEndDate).toBe('both');
	});

	test('should update sales by invoking setSales with corresponding accepted enums', async () => {
		const { result } = renderHook(() => useTicketsListFilterStateManager(), { wrapper });
		await actWait();

		act(() => {
			result.current.setSales(TicketsSalesFilters.above50Sold);
		});
		expect(result.current.sales).toBe('above-50-sold');
	});

	test('should update status by invoking setStatus with corresponding accepted enums', async () => {
		const { result } = renderHook(() => useTicketsListFilterStateManager(), { wrapper });
		await actWait();

		act(() => {
			result.current.setStatus(TicketsStatusFilters.all);
		});
		expect(result.current.status).toBe('all');
	});
});
