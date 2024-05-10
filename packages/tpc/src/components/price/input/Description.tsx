import { useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';

import { useDataState } from '../../..';
import { Factory } from '..';

import type { TextInputProps } from '@eventespresso/adapters';
import type { PriceModifierProps as PMP } from '../../..';

export const Description: React.FC<PMP> = ({ price }) => {
	const { updatePrice } = useDataState();

	const disabled: boolean = useMemo(() => price.isDefault, [price.isDefault]);

	const onChange: TextInputProps['onChange'] = useCallback(
		({ currentTarget: { value } }) => {
			updatePrice({ id: price.id, fieldValues: { description: value } });
		},
		[price, updatePrice]
	);

	const value: string = useMemo(() => price.description, [price.description]);

	return (
		<Factory
			_type='Text'
			name={__('price description')}
			aria-label={__('price description')}
			disabled={disabled}
			placeholder={__('description…')}
			onChange={onChange}
			value={value}
			defaultValue={value}
		/>
	);
};
