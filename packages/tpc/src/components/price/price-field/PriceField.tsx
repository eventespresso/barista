import { useCallback } from 'react';

import { useDataState } from '../../../data';
import { BaseField } from '..';

import type { BaseFieldProps, PriceFieldProps } from '..';

type BFP = BaseFieldProps;

// TODO: move under 'input' folder
// TODO: consolidate types

export const PriceField: React.FC<PriceFieldProps> = ({ field, price, ...rest }) => {
	const { updatePrice } = useDataState();

	const getValue: BFP['getValue'] = useCallback(() => price[field], [field, price]);

	const setValue: BFP['setValue'] = useCallback(
		(value) => {
			updatePrice({ id: price.id, fieldValues: { [field]: value } });
		},
		[updatePrice, price.id, field]
	);

	return <BaseField {...rest} getValue={getValue} setValue={setValue} name={field} />;
};
