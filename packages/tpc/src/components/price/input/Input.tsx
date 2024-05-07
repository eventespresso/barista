import { useCallback } from 'react';

import { useDataState } from '../../../data';
import { BaseField } from '..';

import type { BaseFieldProps } from '..';

import type { TpcPriceModifier, PriceModifierProps } from '../../../..';

export interface Props
	extends PriceModifierProps,
		Omit<BaseFieldProps<number | string>, 'getValue' | 'setValue' | 'name'> {
	field: keyof TpcPriceModifier;
}

/**
 * Generic input component
 */
export const Input: React.FC<Props> = ({ field, price, ...rest }) => {
	const { updatePrice } = useDataState();
	type BFP = BaseFieldProps; // alias

	const getValue: BFP['getValue'] = useCallback(() => price[field], [field, price]);

	const setValue: BFP['setValue'] = useCallback(
		(value) => {
			updatePrice({ id: price.id, fieldValues: { [field]: value } });
		},
		[updatePrice, price.id, field]
	);

	return <BaseField {...rest} getValue={getValue} setValue={setValue} name={field} />;
};
