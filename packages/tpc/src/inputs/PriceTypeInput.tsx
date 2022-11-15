import { __ } from '@eventespresso/i18n';
import { usePriceTypes } from '@eventespresso/edtr-services';
import { getPriceModifiers } from '@eventespresso/predicates';

import { PriceField } from '../fields';
import type { PriceModifierProps } from '../types';
import { useDataState } from '../data';

const PriceTypeInput: React.FC<PriceModifierProps> = ({ price }) => {
	const { isDisabled } = useDataState();
	const priceTypes = usePriceTypes();
	const modifierOptions = getPriceModifiers(priceTypes);
	const options = price.isBasePrice ? priceTypes : modifierOptions;
	// price type cannot be changed for base/default price
	const disabled = isDisabled || price.isBasePrice || price.isDefault;

	return (
		<PriceField
			aria-label={__('price type')}
			component={'select'}
			disabled={disabled}
			field='priceType'
			price={price}
			type='select'
		>
			{options.map((option) => (
				<option key={option.id} value={option.id}>
					{option.name}
				</option>
			))}
		</PriceField>
	);
};

export default PriceTypeInput;
