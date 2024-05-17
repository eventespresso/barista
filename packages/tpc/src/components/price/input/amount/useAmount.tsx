import { useCallback, useMemo } from 'react';

import { parsedAmount } from '@eventespresso/utils';

import { useDataState } from '../../../../data';

import type { TpcPriceModifier as TPM } from '../../../../types';

export const useAmount: Hook.Type = ({ field, price }) => {
	const { updatePrice } = useDataState();

	const getValue = useCallback<() => number>(() => {
		return valueToNumber(price[field]);
	}, [field, price]);

	const asNumber = getValue;
	const asString = useCallback(() => asNumber().toString(), [asNumber]);

	const setValue = useCallback<(value: string | number) => void>(
		(value) => {
			const newValue = Math.abs(parsedAmount(value));
			updatePrice({ id: price.id, fieldValues: { [field]: newValue } });
		},
		[updatePrice, price, field]
	);

	return useMemo(
		() => ({
			getValue: {
				asString,
				asNumber,
			},
			setValue,
		}),
		[asNumber, asString, setValue]
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
		getValue: {
			asString: () => string;
			asNumber: () => number;
		};
		setValue: (value: string | number) => void;
	};

	type Field = keyof TPM;
}
