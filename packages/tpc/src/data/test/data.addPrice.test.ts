import { renderHook, act } from '@testing-library/react-hooks';
import { last } from 'ramda';

import { usePriceTypeForPrice } from '@eventespresso/edtr-services';
import { uuid } from '@eventespresso/utils';

import { useDataState } from '../';
import { usePriceModifier } from '../../hooks';
import defaultPrice from '../../defaultPriceModifier';
import TestWrapper from './TestWrapper';
import { actWait } from '@eventespresso/utils/src/test';

describe('TPC:data.addPrice', () => {
	it('adds a price at the end of the price list', async () => {
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

		// this doesn't work
		// const { baseType, dataState, defaultPriceModifier } = result.current;

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

		// Add the price without passing index
		act(() => result.current.dataState.addPrice(newPrice));

		const lastPrice = last(result.current.dataState.getData().prices);

		// use the updated order from added price
		expect({ ...newPrice, order: lastPrice.order }).toEqual(lastPrice);
	});

	it('adds a price at a specific index of the price list', async () => {
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

		const priceAtIndex1 = result.current.dataState.getData().prices[1];

		// use the updated order from added price
		expect({ ...newPrice, order: priceAtIndex1.order }).toEqual(priceAtIndex1);
	});
});
