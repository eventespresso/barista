import { useCallback, useMemo } from 'react';

import { parsedAmount } from '@eventespresso/utils';

import { useDataState } from '../data';
import type { BaseFieldProps, UsePrice, UsePriceAmount } from './types';

type BFP = BaseFieldProps;

const usePriceAmount = ({ field, price }: UsePriceAmount): UsePrice => {
	const { updatePrice } = useDataState();

	const getValue = useCallback<BFP['getValue']>(() => price[field], [field, price]);

	const setValue = useCallback<BFP['setValue']>(
		(value) => {
			const absValue = parsedAmount(value as number);
			const positiveValue = absValue > 0 ? absValue : absValue * -1;
			updatePrice({ id: price.id, fieldValues: { [field]: positiveValue } });
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
