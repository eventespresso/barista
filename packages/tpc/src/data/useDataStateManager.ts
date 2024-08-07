import { useCallback, useMemo, useReducer } from 'react';

import { usePriceTypes, useTicketPrices, useLazyTicket } from '@eventespresso/edtr-services';

import { DataStateManager, DataStateManagerHook } from './types';
import useDataReducer, { initialState } from './useDataReducer';
import useInitialState from './useInitialState';

type DSM = DataStateManager;

const useDataStateManager: DataStateManagerHook = (props) => {
	const getTicket = useLazyTicket();
	const getTicketPrices = useTicketPrices();
	const priceTypes = usePriceTypes();

	// pass the appolo cache access as default
	const initializer = useInitialState({ getTicketPrices, getTicket, ...props });
	const dataReducer = useDataReducer(initializer);
	const [state, dispatch] = useReducer(dataReducer, initialState, initializer);

	const getData: DSM['getData'] = useCallback(() => state, [state]);

	const toggleCalcDir: DSM['toggleCalcDir'] = useCallback(() => {
		dispatch({
			type: 'TOGGLE_CALC_DIR',
		});
	}, []);

	const updateTicketPrice: DSM['updateTicketPrice'] = useCallback((ticketPrice) => {
		dispatch({
			type: 'UPDATE_TICKET_PRICE',
			ticketPrice,
		});
	}, []);

	const setPrices: DSM['setPrices'] = useCallback((prices) => {
		dispatch({
			type: 'SET_PRICES',
			prices,
		});
	}, []);

	const addPrice: DSM['addPrice'] = useCallback((price, index) => {
		dispatch({
			type: 'ADD_PRICE',
			index,
			price,
		});
	}, []);

	const updatePrice: DSM['updatePrice'] = useCallback(({ id, fieldValues }) => {
		dispatch({
			type: 'UPDATE_PRICE',
			id,
			fieldValues,
		});
	}, []);

	const deletePrice: DSM['deletePrice'] = useCallback((id, isNewOrDefault) => {
		if (!isNewOrDefault) {
			dispatch({
				type: 'ADD_PRICE_TO_DELETED',
				id,
			});
		}
		dispatch({
			type: 'DELETE_PRICE',
			id,
		});
	}, []);

	const reset: DSM['reset'] = useCallback(() => {
		dispatch({
			type: 'RESET',
		});
	}, []);

	const reverseCalculate: boolean = useMemo(() => Boolean(state.ticket?.reverseCalculate), [state.ticket]);

	return useMemo(
		() => ({
			...state,
			addPrice,
			deletePrice,
			getData,
			priceTypes,
			reset,
			reverseCalculate,
			setPrices,
			toggleCalcDir,
			updatePrice,
			updateTicketPrice,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state]
	);
};

export default useDataStateManager;
