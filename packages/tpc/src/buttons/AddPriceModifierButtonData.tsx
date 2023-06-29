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
	const priceType = usePriceTypeForPrice(defaultPriceModifier.id);
	const invalidBaseType = !isPriceType(priceType);

	const { addPrice } = useDataState();

	const addPriceModifier = useCallback(() => {
		if (invalidBaseType) {
			return;
		}
		const newPrice: TpcPriceModifier = {
			...defaultPriceModifier,
			id: uuid(),
			isBasePrice: priceType.isBasePrice,
			isDiscount: priceType.isDiscount,
			isPercent: priceType.isPercent,
			isTax: priceType.isTax,
			order: priceType.order,
			isNew: true,
		};

		addPrice(newPrice, index + 1);
	}, [
		addPrice,
		priceType?.isBasePrice,
		priceType?.isDiscount,
		priceType?.isPercent,
		priceType?.isTax,
		priceType?.order,
		defaultPriceModifier,
		index,
		invalidBaseType,
	]);
	return <AddPriceModifierButton addPriceModifier={addPriceModifier} isDisabled={invalidBaseType} />;
};
export default AddPriceModifierButtonData;
