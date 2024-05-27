import { __ } from '@eventespresso/i18n';

import { Factory } from '..';
import { useData } from '.';

import type { PriceModifierProps as PMP } from '../../..';

export const Name: React.FC<PMP> = ({ price }) => {
	const { value, onChange } = useData({ price, field: 'name' });

	return (
		<Factory
			_type='Text'
			name={__('price name')}
			aria-label={__('price name')}
			// default prices cannot be changed in TPC
			disabled={price.isDefault}
			placeholder={__('label…')}
			value={value}
			onChange={onChange}
		/>
	);
};
