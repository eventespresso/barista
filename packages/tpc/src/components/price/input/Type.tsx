import { __ } from '@eventespresso/i18n';
import { usePriceTypes } from '@eventespresso/edtr-services';
import { getPriceModifiers } from '@eventespresso/predicates';

import { useDataState } from '../../../data';
import { Input } from '.';

import type { PriceModifierProps } from '../../../types';

export const Type: React.FC<PriceModifierProps> = ({ price }) => {
	const { isDisabled } = useDataState();
	const priceTypes = usePriceTypes();
	const modifierOptions = getPriceModifiers(priceTypes);
	const options = price.isBasePrice ? priceTypes : modifierOptions;
	// TODO: use package 'classname'
	const className = !options.length ? 'ee-select--error' : null;
	// price type cannot be changed for base/default price
	const disabled = isDisabled || price.isBasePrice || price.isDefault;

	return (
		<Input
			aria-label={__('price type')}
			className={className}
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
		</Input>
	);
};
