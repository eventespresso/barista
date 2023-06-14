import { useCallback, useMemo } from 'react';

import { formatAmount, sanitizeAmount } from '@eventespresso/utils';

import { useDataState } from '../data';
import type { BaseFieldProps, UsePrice, UsePriceAmount } from './types';

type BFP = BaseFieldProps<string>;

const usePriceAmount = ({ field, price }: UsePriceAmount): UsePrice => {
	const { updatePrice } = useDataState();

	const getValue = useCallback<BFP['getValue']>(() => {
		const value = price[field]?.toString();
		console.log('%c usePriceAmount::setValue()', 'color: Yellow; font-size: 12px;');
		console.log('%c value', 'color: Yellow;', value);
		return value;
	}, [field, price]);

	const setValue = useCallback<BFP['setValue']>(
		(value) => {
			console.log('%c usePriceAmount::setValue()', 'color: LimeGreen; font-size: 12px;');
			console.log('%c value', 'color: DodgerBlue;', value);
			updatePrice({ id: price.id, fieldValues: { [field]: sanitizeAmount(value) } });
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
