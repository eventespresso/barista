import { useCallback } from 'react';
import { any, append, findIndex, has, insert, last, update } from 'ramda';

import { DataStateReducer, StateInitializer, DataState } from './types';
import { entityHasGuid, isTax, sortByPriceOrderIdAsc } from '@eventespresso/predicates';
import { TpcPriceModifier } from '../types';

export const initialState: DataState = {
	ticket: null,
	prices: [],
	deletedPrices: [],
	isDirty: false,
	isDisabled: false,
};

const hasOnlyNameOrDesc = (price: Partial<TpcPriceModifier>) => {
	if (price) {
		const allowedKeys = ['name', 'description'];
		for (const key in price) {
			if (!allowedKeys.includes(key)) {
				return false;
			}
		}
		return true;
	}
	return false;
};

const useDataReducer = (initializer: StateInitializer): DataStateReducer => {
	return useCallback<DataStateReducer>(
		(state, action) => {
			const { type, id, index, fieldValues, ticketPrice, price, prices } = action;

			let isTaxable: boolean,
				newPrices: Array<TpcPriceModifier>,
				priceIndex: number,
				order: number,
				priceToUpdate: TpcPriceModifier,
				updatedPrice: TpcPriceModifier,
				retainedPrices: Array<TpcPriceModifier>,
				updatedPrices: Array<TpcPriceModifier>,
				newState: DataState;

			// if TPC is disabled, we only allow changing of price name and description
			if (state.isDisabled && (type !== 'UPDATE_PRICE' || !hasOnlyNameOrDesc(fieldValues))) {
				return state;
			}

			// if price order is being updated
			const isOrderChanged = fieldValues && has('order', fieldValues);

			// we won't allo price order to be less than 2
			// because that is reserved for base price
			if (isOrderChanged && fieldValues.order < 2) {
				return state;
			}

			switch (type) {
				case 'TOGGLE_CALC_DIR':
					newState = {
						...state,
						ticket: {
							...state.ticket,
							reverseCalculate: !state.ticket?.reverseCalculate,
						},
					};
					break;

				case 'UPDATE_TICKET_PRICE':
					isTaxable = any(isTax, state.prices);
					newState = {
						...state,
						ticket: {
							...state.ticket,
							price: ticketPrice,
							isTaxable,
						},
					};
					break;

				case 'SET_PRICES':
					newState = {
						...state,
						prices,
					};
					break;

				case 'ADD_PRICE':
					if (index !== undefined) {
						const orderOfThePriceAtIndex = state.prices?.[index - 1]?.order || 0;
						// add only 1 to make sure the price is added just after the index
						order = +orderOfThePriceAtIndex + 1;
					} else {
						const orderOfTheLastPrice = last(state.prices)?.order || 0;
						order = +orderOfTheLastPrice + 10;
					}

					newPrices =
						index !== undefined
							? insert(index, { ...price, order }, state.prices)
							: append({ ...price, order }, state.prices);

					newState = {
						...state,
						prices: newPrices,
					};
					break;

				case 'UPDATE_PRICE':
					// find the index of the price to update
					priceIndex = findIndex(entityHasGuid(id), state.prices);
					// if price id does not exist
					if (priceIndex < 0) {
						return state;
					}
					// get the price object
					priceToUpdate = state.prices[priceIndex];

					// update the price object
					updatedPrice = { ...priceToUpdate, ...fieldValues, isModified: true };

					// update the prices list
					updatedPrices = update(priceIndex, updatedPrice, state.prices);

					if (isOrderChanged) {
						// sort them by order
						updatedPrices = sortByPriceOrderIdAsc(updatedPrices);
					}

					isTaxable = any(isTax, updatedPrices);
					newState =
						priceIndex > -1
							? {
									...state,
									prices: updatedPrices,
									ticket: {
										...state.ticket,
										isTaxable,
									},
							  }
							: state;
					break;

				case 'DELETE_PRICE':
					retainedPrices = state.prices.filter(({ id: priceId }) => id !== priceId);
					isTaxable = any(isTax, retainedPrices);
					newState = {
						...state,
						prices: retainedPrices,
						ticket: {
							...state.ticket,
							isTaxable,
						},
					};
					break;

				case 'ADD_PRICE_TO_DELETED':
					if (state.deletedPrices.includes(id)) {
						newState = state;
					} else {
						newState = {
							...state,
							deletedPrices: [...state.deletedPrices, id],
						};
					}
					break;

				case 'RESET':
					return initializer(initialState);

				default:
					throw new Error('Unexpected action');
			}

			return { ...newState, isDirty: true };
		},
		[initializer]
	);
};

export default useDataReducer;
