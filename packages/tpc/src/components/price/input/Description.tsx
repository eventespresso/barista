import { __ } from '@eventespresso/i18n';

import { PriceField } from '..';

import type { PriceModifierProps } from '../../..';

export const Description: React.FC<PriceModifierProps> = ({ price }) => {
	return (
		<PriceField
			aria-label={__('price description')}
			component={'input'}
			// default prices cannot be changed in TPC
			disabled={price.isDefault}
			field='description'
			placeholder={__('description…')}
			price={price}
			type={'text'}
		/>
	);
};
