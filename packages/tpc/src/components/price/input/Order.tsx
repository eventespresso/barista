import { __ } from '@eventespresso/i18n';

import { Factory } from '..';
import { useData } from '.';

import type { PriceModifierProps as PMP } from '../../..';
import { useMemo } from 'react';

export const Order: React.FC<PMP> = ({ price }) => {
	const { manager, onChange, value } = useData({ price, field: 'order' });

	// order cannot be changed for base or default prices
	const disabled = useMemo<boolean>(() => {
		return manager.isDisabled || price.isBasePrice || price.isDefault;
	}, [manager, price]);

	return (
		<Factory
			_type='Text'
			name={__('price order')}
			aria-label={__('price order')}
			className='ee-input-width--small'
			disabled={disabled}
			min={1}
			value={value}
			onChange={onChange}
		/>
	);
};
