import { renderHook, act } from '@testing-library/react-hooks';
import { last } from 'ramda';

import { usePriceTypeForPrice } from '@eventespresso/edtr-services';
import { uuid } from '@eventespresso/utils';

import { usePriceModifier } from '../../hooks';
import defaultPrice from '../../defaultPriceModifier';
import { useDataState } from '../';
import TestWrapper from './TestWrapper';
import { actWait } from '@eventespresso/utils/src/test';

describe('TPC:data.deletePrice', () => {
	it('deletes the last price and adds it to deleted list', async () => {
		const { result } = renderHook(
			() => {
				return useDataState();
			},
			{
				wrapper: TestWrapper,
			}
		);
		await actWait();

		// Make sure the state is properly set before moving ahead
		act(() => result.current.reset());

		const prevCount = result.current.getData().prices.length;

		const lastPrice = last(result.current.getData().prices);

		// delete the price
		act(() => result.current.deletePrice(lastPrice.id));

		const newCount = result.current.getData().prices.length;

		expect(newCount).toBe(prevCount - 1);
		// it should be added to deleted list
		expect(result.current.getData().deletedPrices).toContain(lastPrice.id);
	});

	it('deletes a newly added price and does NOT add it to deleted list', async () => {
		const { result } = renderHook(
			() => {
				const defaultPriceModifier = usePriceModifier(defaultPrice);
				return {
					dataState: useDataState(),
					baseType: usePriceTypeForPrice(defaultPriceModifier.id),
					defaultPriceModifier,
				};
			},
			{
				wrapper: TestWrapper,
			}
		);

		await actWait();

		// Make sure the state is properly set before moving ahead
		act(() => result.current.dataState.reset());

		// generate an id for the price
		const newPriceId = uuid();

		const newPrice = {
			...result.current.defaultPriceModifier,
			id: newPriceId,
			isBasePrice: result.current.baseType.isBasePrice,
			isDiscount: result.current.baseType.isDiscount,
			isPercent: result.current.baseType.isPercent,
			isTax: result.current.baseType.isTax,
			order: result.current.baseType.order,
			isNew: true,
		};

		// Add the price at index 1
		act(() => result.current.dataState.addPrice(newPrice, 1));

		// now delete the price
		act(() => result.current.dataState.deletePrice(newPriceId, true));

		// it should NOT be added to deleted list
		expect(result.current.dataState.getData().deletedPrices).not.toContain(newPriceId);
	});
});
