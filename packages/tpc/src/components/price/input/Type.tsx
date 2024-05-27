import { useMemo } from 'react';
import css from 'classnames';

import { __ } from '@eventespresso/i18n';
import { usePriceTypes } from '@eventespresso/edtr-services';
import { getPriceModifiers } from '@eventespresso/predicates';

import { Factory } from '..';
import { useData } from '.';

import type { PriceModifierProps as PMP } from '../../../types';

export const Type: React.FC<PMP> = ({ price }) => {
	const { manager, onChange, value } = useData({ price, field: 'priceType' });
	const priceTypes = usePriceTypes();

	const modifierOptions = getPriceModifiers(priceTypes);
	const options = price.isBasePrice ? priceTypes : modifierOptions;
	const className = css({ 'ee-select--error': !options.length });

	const disabled = useMemo<boolean>(() => {
		// price type cannot be changed for base/default price
		return manager.isDisabled || price.isBasePrice || price.isDefault;
	}, [manager, price]);

	return (
		<Factory
			_type='Select'
			name={__('price type')}
			aria-label={__('price type')}
			className={className}
			disabled={disabled}
			value={value}
			onChange={onChange}
		>
			{options.map((option) => (
				<option key={option.id} value={option.id}>
					{option.name}
				</option>
			))}
		</Factory>
	);
};
