import { __ } from '@eventespresso/i18n';

import { PriceField } from '../fields';
import { useDataState } from '../data';
import type { PriceModifierProps } from '../types';

const PriceOrderInput: React.FC<PriceModifierProps> = ({ price }) => {
	const { isDisabled } = useDataState();
	// order cannot be changed for base or default prices
	const disabled = isDisabled || price.isBasePrice || price.isDefault;

	return (
		<PriceField
			aria-label={__('price order')}
			className={'ee-input-width--small'}
			component={'input'}
			disabled={disabled}
			field='order'
			min={1}
			price={price}
			type={'text'}
		/>
	);
};

export default PriceOrderInput;
