import { useCallback } from 'react';

import { usePriceTypeForPrice } from '@eventespresso/edtr-services';
import { isPriceType } from '@eventespresso/predicates';
import { uuid } from '@eventespresso/utils';

import AddPriceModifierButton from './AddPriceModifierButton';
import type { PriceModifierButtonProps, TpcPriceModifier } from '../types';
import { usePriceModifier } from '../hooks';
import defaultPrice from '../defaultPriceModifier';
import { useDataState } from '../data';

const AddPriceModifierButtonData: React.FC<Partial<PriceModifierButtonProps>> = ({ index }) => {
	const defaultPriceModifier = usePriceModifier(defaultPrice);
	const baseType = usePriceTypeForPrice(defaultPriceModifier.id);
	const invalidBaseType = !isPriceType(baseType);

	const { addPrice } = useDataState();

	const addPriceModifier = useCallback(() => {
		if (invalidBaseType) {
			return;
		}
		const newPrice: TpcPriceModifier = {
			...defaultPriceModifier,
			id: uuid(),
			isBasePrice: baseType.isBasePrice,
			isDiscount: baseType.isDiscount,
			isPercent: baseType.isPercent,
			isTax: baseType.isTax,
			order: baseType.order,
			isNew: true,
		};

		addPrice(newPrice, index + 1);
	}, [
		addPrice,
		baseType?.isBasePrice,
		baseType?.isDiscount,
		baseType?.isPercent,
		baseType?.isTax,
		baseType?.order,
		defaultPriceModifier,
		index,
		invalidBaseType,
	]);
	return <AddPriceModifierButton addPriceModifier={addPriceModifier} isDisabled={invalidBaseType} />;
};
export default AddPriceModifierButtonData;
