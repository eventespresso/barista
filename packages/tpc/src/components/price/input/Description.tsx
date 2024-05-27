import { __ } from '@eventespresso/i18n';

import { Factory } from '..';
import { useData } from '.';

import type { PriceModifierProps as PMP } from '../../..';

export const Description: React.FC<PMP> = ({ price }) => {
	const { onChange, value } = useData({ price, field: 'description' });

	return (
		<Factory
			_type='Text'
			name={__('price description')}
			aria-label={__('price description')}
			// default descriptions cannot be changed in TPC
			disabled={price.isDefault}
			placeholder={__('description…')}
			onChange={onChange}
			value={value}
		/>
	);
};
