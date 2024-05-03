import { renderHook, act } from '@testing-library/react-hooks';
import { last } from 'ramda';

import { usePriceTypeForPrice } from '@eventespresso/edtr-services';
import { getBasePrice } from '@eventespresso/predicates';
import { uuid } from '@eventespresso/utils';

import { useDataState } from '../';
import { usePriceModifier } from '../../hooks';
import defaultPrice from '../../defaultPriceModifier';
import TestWrapper from './TestWrapper';
import { calculateBasePrice, calculateTicketTotal } from '../../utils';
import { actWait } from '@eventespresso/utils/src/test';

describe('TPC:data.calculations', () => {
	it('adds a price to reflect the change in ticket total when reverseCalculate is false', async () => {
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

		// Make sure reverseCalculate is false
		if (result.current.dataState.reverseCalculate) {
			act(() => result.current.dataState.toggleCalcDir());
		}

		const basePriceBefore = getBasePrice(result.current.dataState.getData().prices);
		const ticketTotalBefore = result.current.dataState.getData().ticket.price;

		// Add the price
		act(() => result.current.dataState.addPrice(newPrice));

		act(() => result.current.dataState.updatePrice({ id: newPriceId, fieldValues: { amount: 5 } }));

		const basePriceAfter = getBasePrice(result.current.dataState.getData().prices);
		const ticketTotalAfter = result.current.dataState.getData().ticket.price;

		// base price should not change because reverseCalculate is false
		expect(basePriceBefore.amount).toEqual(basePriceAfter.amount);
		// Ticket total must have changed
		expect(ticketTotalBefore).not.toEqual(ticketTotalAfter);

		// calculate the expected ticket total
		const calculatedTicketTotal = calculateTicketTotal(result.current.dataState.getData().prices);

		expect(calculatedTicketTotal).toEqual(ticketTotalAfter);
	});

	it('adds a price to reflect the change base price when reverseCalculate is true', async () => {
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

		// Make sure reverseCalculate is true
		if (!result.current.dataState.reverseCalculate) {
			act(() => result.current.dataState.toggleCalcDir());
		}

		const basePriceBefore = getBasePrice(result.current.dataState.getData().prices);
		const ticketTotalBefore = result.current.dataState.getData().ticket.price;

		// Add the price
		act(() => result.current.dataState.addPrice(newPrice));

		// Update price amount
		act(() => {
			result.current.dataState.updatePrice({ id: newPriceId, fieldValues: { amount: 5 } });
		});

		const basePriceAfter = getBasePrice(result.current.dataState.getData().prices);
		const ticketTotalAfter = result.current.dataState.getData().ticket?.price;

		// ticket total should not change because reverseCalculate is true
		expect(ticketTotalBefore).toEqual(ticketTotalAfter);
		// base price must have changed
		expect(basePriceBefore.amount).not.toEqual(basePriceAfter.amount);

		// calculate the expected base price
		const newPriceAmount = calculateBasePrice(
			result.current.dataState.ticket?.price,
			result.current.dataState.prices
		);

		expect(newPriceAmount).toEqual(basePriceAfter.amount);
	});

	it('updates the amount of an existing price and base price to reflect the change in ticket total when reverseCalculate is false', async () => {
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

		// Make sure reverseCalculate is false
		if (result.current.reverseCalculate) {
			act(() => result.current.toggleCalcDir());
		}

		const lastPrice = last(result.current.getData().prices);

		const basePriceBefore = getBasePrice(result.current.getData().prices);
		const ticketTotalBefore = result.current.getData().ticket.price;

		act(() => {
			// Update the price amount of base price
			result.current.updatePrice({ id: basePriceBefore.id, fieldValues: { amount: 5.8 } });
			// Also update the price amount of last price (non-base)
			result.current.updatePrice({ id: lastPrice.id, fieldValues: { amount: 6.5 } });
		});

		const basePriceAfter = getBasePrice(result.current.getData().prices);
		const ticketTotalAfter = result.current.getData().ticket.price;

		expect(basePriceAfter.amount).toEqual(5.8);
		// Ticket total must have changed
		expect(ticketTotalBefore).not.toEqual(ticketTotalAfter);

		// calculate th expected ticket total
		const calculatedTicketTotal = calculateTicketTotal(result.current.getData().prices);

		expect(calculatedTicketTotal).toEqual(ticketTotalAfter);
	});

	it('updates the amount of an existing price to reflect the change in base price when reverseCalculate is true', async () => {
		const { result } = renderHook(
			() => {
				return {
					dataState: useDataState(),
				};
			},
			{
				wrapper: TestWrapper,
			}
		);
		await actWait();

		// Make sure the state is properly set before moving ahead
		act(() => result.current.dataState.reset());

		// Make sure reverseCalculate is true
		if (!result.current.dataState.reverseCalculate) {
			act(() => result.current.dataState.toggleCalcDir());
		}

		const lastPrice = last(result.current.dataState.getData().prices);

		const basePriceBefore = getBasePrice(result.current.dataState.getData().prices);
		const ticketTotalBefore = result.current.dataState.getData().ticket.price;

		act(() => {
			// Update the price amount of last price (non-base)
			result.current.dataState.updatePrice({ id: lastPrice.id, fieldValues: { amount: 6.5 } });
		});

		const basePriceAfter = getBasePrice(result.current.dataState.getData().prices);
		const ticketTotalAfter = result.current.dataState.getData().ticket.price;

		expect(ticketTotalBefore).toEqual(ticketTotalAfter);
		// base price must have changed
		expect(basePriceBefore.amount).not.toEqual(basePriceAfter.amount);

		// calculate the expected base price
		const newPriceAmount = calculateBasePrice(
			result.current.dataState.getData().ticket?.price,
			result.current.dataState.getData().prices
		);

		expect(newPriceAmount).toEqual(basePriceAfter.amount);
	});

	it('updates the ticket total to reflect the change in base price when reverseCalculate is true', async () => {
		const { result } = renderHook(
			() => {
				return {
					dataState: useDataState(),
				};
			},
			{
				wrapper: TestWrapper,
			}
		);
		await actWait();

		// Make sure the state is properly set before moving ahead
		act(() => result.current.dataState.reset());

		// Make sure reverseCalculate is true
		if (!result.current.dataState.reverseCalculate) {
			act(() => result.current.dataState.toggleCalcDir());
		}

		const lastPrice = last(result.current.dataState.getData().prices);

		const basePriceBefore = getBasePrice(result.current.dataState.getData().prices);

		act(() => {
			// Update the price amount of last price (non-base)
			result.current.dataState.updatePrice({ id: lastPrice.id, fieldValues: { amount: 6.5 } });
			// Also change the ticket total
			result.current.dataState.updateTicketPrice(52);
		});

		const basePriceAfter = getBasePrice(result.current.dataState.getData().prices);
		const ticketTotalAfter = result.current.dataState.getData().ticket.price;

		expect(ticketTotalAfter).toEqual(52);
		// base price must have changed
		expect(basePriceBefore.amount).not.toEqual(basePriceAfter.amount);

		// calculate the expected base price
		const newPriceAmount = calculateBasePrice(
			result.current.dataState.getData().ticket?.price,
			result.current.dataState.getData().prices
		);

		expect(newPriceAmount).toEqual(basePriceAfter.amount);
	});

	it('updates the priceType of an existing price to reflect the change in ticket total when reverseCalculate is false', async () => {
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

		// Make sure reverseCalculate is false
		if (result.current.reverseCalculate) {
			act(() => result.current.toggleCalcDir());
		}

		const lastPrice = last(result.current.getData().prices);

		const basePriceBefore = getBasePrice(result.current.getData().prices);
		const ticketTotalBefore = result.current.getData().ticket.price;

		act(() => {
			// Update the priceType
			result.current.updatePrice({ id: lastPrice.id, fieldValues: { priceType: 'abc' } });
		});

		const basePriceAfter = getBasePrice(result.current.getData().prices);
		const ticketTotalAfter = result.current.getData().ticket.price;

		// no change in base price
		expect(basePriceBefore.amount).toEqual(basePriceAfter.amount);
		// Ticket total must have changed
		expect(ticketTotalBefore).not.toEqual(ticketTotalAfter);

		// calculate th expected ticket total
		const calculatedTicketTotal = calculateTicketTotal(result.current.getData().prices);

		expect(calculatedTicketTotal).toEqual(ticketTotalAfter);
	});

	it('updates the priceType of an existing price to reflect the change in base price when reverseCalculate is true', async () => {
		const { result } = renderHook(
			() => {
				return {
					dataState: useDataState(),
				};
			},
			{
				wrapper: TestWrapper,
			}
		);
		await actWait();

		// Make sure the state is properly set before moving ahead
		act(() => result.current.dataState.reset());

		// Make sure reverseCalculate is true
		if (!result.current.dataState.reverseCalculate) {
			act(() => result.current.dataState.toggleCalcDir());
		}

		const lastPrice = last(result.current.dataState.getData().prices);

		const basePriceBefore = getBasePrice(result.current.dataState.getData().prices);
		const ticketTotalBefore = result.current.dataState.getData().ticket.price;

		act(() => {
			// Update the priceType
			result.current.dataState.updatePrice({ id: lastPrice.id, fieldValues: { priceType: 'abc' } });
		});

		const basePriceAfter = getBasePrice(result.current.dataState.getData().prices);
		const ticketTotalAfter = result.current.dataState.getData().ticket.price;

		// No change in ticket total
		expect(ticketTotalBefore).toEqual(ticketTotalAfter);
		// base price must have changed
		expect(basePriceBefore.amount).not.toEqual(basePriceAfter.amount);

		// calculate the expected base price
		const newPriceAmount = calculateBasePrice(
			result.current.dataState.getData().ticket?.price,
			result.current.dataState.getData().prices
		);

		expect(newPriceAmount).toEqual(basePriceAfter.amount);
	});
});
