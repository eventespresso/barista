import { useCallback, useMemo } from 'react';

import { parsedAmount } from '@eventespresso/utils';

import { useDataState } from '../../../../data';

import type { PriceModifierProps, TpcPriceModifier } from '../../../../types';
import type { BaseFieldProps, FieldValue } from '../..';

type BFP = BaseFieldProps;

interface PriceFieldProps
	extends PriceModifierProps,
		Omit<BaseFieldProps<number | string>, 'getValue' | 'setValue' | 'name'> {
	field: keyof TpcPriceModifier;
}

interface UsePriceAmount extends Pick<PriceFieldProps, 'field' | 'price'> {}

interface UsePrice {
	getValue: () => FieldValue;
	setValue: (value: FieldValue) => void;
}

export const useAmount = ({ field, price }: UsePriceAmount): UsePrice => {
	const { updatePrice } = useDataState();

	const getValue = useCallback<BFP['getValue']>(() => price[field], [field, price]);

	const setValue = useCallback<BFP['setValue']>(
		(value) => {
			const absValue = Math.abs(parsedAmount(value as number)) || 0;
			updatePrice({ id: price.id, fieldValues: { [field]: absValue } });
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
