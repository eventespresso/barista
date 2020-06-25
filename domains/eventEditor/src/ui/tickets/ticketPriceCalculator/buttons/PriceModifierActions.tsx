import React from 'react';

import { Box, Divider } from '@eventespresso/components';
import AddPriceModifierButton from './AddPriceModifierButtonData';
import DeletePriceModifierButton from './DeletePriceModifierButton';
import type { PriceModifierProps } from '../types';

const PriceModifierActions: React.FC<PriceModifierProps> = ({ index, price }) => {
	return (
		<Box className='ee-price-modifier-actions' display='flex'>
			<AddPriceModifierButton index={index} key='add' />

			<Divider orientation='vertical' borderColor='transparent' />

			{!price.isBasePrice && <DeletePriceModifierButton key='delete' price={price} />}
		</Box>
	);
};

export default PriceModifierActions;
