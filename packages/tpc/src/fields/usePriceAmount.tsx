import { useCallback, useMemo } from 'react';

import { useDataState } from '../data';
import type { BaseFieldProps, UsePrice, UsePriceAmount } from './types';

type BFP = BaseFieldProps;

const usePriceAmount = ({ field, price }: UsePriceAmount): UsePrice => {
	const { updatePrice } = useDataState();

	const getValue = useCallback<BFP['getValue']>(() => {
		return price[field];
	}, [field, price]);

	const setValue = useCallback<BFP['setValue']>(
		(value) => {
			updatePrice({ id: price.id, fieldValues: { [field]: value } });
		},
		[updatePrice, price.id, field]
	);

	return useMemo(
		() => ({
			getValue,
			setValue,
		}),
		[getValue, setValue]
	);
};

export default usePriceAmount;
