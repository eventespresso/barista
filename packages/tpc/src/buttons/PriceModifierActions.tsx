import { Divider } from '@eventespresso/ui-components';
import { Box } from '@eventespresso/adapters';
import AddPriceModifierButton from './AddPriceModifierButtonData';
import DeletePriceModifierButton from './DeletePriceModifierButton';
import type { PriceModifierButtonProps } from '../types';

const PriceModifierActions: React.FC<PriceModifierButtonProps> = ({ index, price }) => {
	return (
		<Box display='flex'>
			<AddPriceModifierButton index={index} key='add' />

			<Divider orientation='vertical' size='micro' borderColor='transparent' />

			{!price.isBasePrice && <DeletePriceModifierButton index={index} key='delete' price={price} />}
		</Box>
	);
};

export default PriceModifierActions;
