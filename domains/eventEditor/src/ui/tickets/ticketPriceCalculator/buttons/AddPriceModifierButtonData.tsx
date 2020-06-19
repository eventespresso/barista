import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AddPriceModifierButton from './AddPriceModifierButton';
import { usePriceTypeForPrice } from '@eventespresso/edtr-services';
import { PriceModifierProps, TpcPriceModifier } from '../types';
import { usePriceModifier } from '../hooks';
import defaultPrice from '../defaultPriceModifier';
import { useDataState } from '../data';

const AddPriceModifierButtonData: React.FC<Partial<PriceModifierProps>> = ({ index }) => {
	const defaultPriceModifier = usePriceModifier(defaultPrice);
	const baseType = usePriceTypeForPrice(defaultPriceModifier.id);

	const { addPrice } = useDataState();

	const addPriceModifier = useCallback(() => {
		const newPrice: TpcPriceModifier = {
			...defaultPriceModifier,
			id: uuidv4(),
			isBasePrice: baseType.isBasePrice,
			isDiscount: baseType.isDiscount,
			isPercent: baseType.isPercent,
			isTax: baseType.isTax,
			order: baseType.order,
			isNew: true,
		};

		addPrice(newPrice, index + 1);
	}, [addPrice, baseType.isBasePrice, baseType.isDiscount, baseType.isPercent, baseType.isTax, baseType.order, defaultPriceModifier, index]);
	return <AddPriceModifierButton addPriceModifier={addPriceModifier} />;
};
export default AddPriceModifierButtonData;
