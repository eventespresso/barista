import { __ } from '@eventespresso/i18n';

import { Input } from '.';

import type { PriceModifierProps } from '../../..';

export const Name: React.FC<PriceModifierProps> = ({ price }) => {
	return (
		<Input
			aria-label={__('price name')}
			component={'input'}
			// default prices cannot be changed in TPC
			disabled={price.isDefault}
			field='name'
			placeholder={__('label…')}
			price={price}
			type={'text'}
		/>
	);
};
