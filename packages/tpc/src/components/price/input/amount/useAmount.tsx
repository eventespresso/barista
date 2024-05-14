import { useCallback, useMemo } from 'react';

import { parsedAmount } from '@eventespresso/utils';

import { useDataState } from '../../../../data';

import type { TpcPriceModifier as TPM } from '../../../../types';

export const useAmount: Hook.Type = ({ field, price }) => {
	const { updatePrice } = useDataState();

	const getValue = useCallback<() => number>(() => {
		return parsedAmount(valueToNumber(price[field]));
	}, [field, price]);

	const setValue = useCallback<(value: number) => void>(
		(value) => {
			const newValue = Math.abs(parsedAmount(value)) || 0;
			updatePrice({ id: price.id, fieldValues: { [field]: newValue } });
		},
		[updatePrice, price, field]
	);

	return useMemo(
		() => ({
			getValue,
			setValue,
		}),
		[getValue, setValue]
	);
};

function valueToNumber(input: TPM[keyof TPM]): number {
	if (typeof input === 'number') return input;
	if (typeof input === 'string') return parsedAmount(input);
	return input ? 1 : 0;
}

module Hook {
	export type Type = (props: Props) => Return;

	type Props = {
		price: TPM;
		field: Field;
	};

	type Return = {
		getValue: () => Value;
		setValue: (value: Value) => void;
	};

	type Value = number;
	type Field = keyof TPM;
}
