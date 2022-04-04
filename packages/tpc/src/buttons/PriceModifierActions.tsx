import { Divider } from '@eventespresso/ui-components';
import { Box } from '@eventespresso/adapters';
import AddPriceModifierButton from './AddPriceModifierButtonData';
import DeletePriceModifierButton from './DeletePriceModifierButton';
import type { PriceModifierProps } from '../types';

const PriceModifierActions: React.FC<PriceModifierProps> = ({ index, price }) => {
	return (
		<Box display='flex'>
			<AddPriceModifierButton index={index} key='add' />

			<Divider orientation='vertical' size='micro' borderColor='transparent' />

			{!price.isBasePrice && <DeletePriceModifierButton key='delete' price={price} />}
		</Box>
	);
};

export default PriceModifierActions;
