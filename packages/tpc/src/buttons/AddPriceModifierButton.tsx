import { __ } from '@eventespresso/i18n';

import { IconButton } from '@eventespresso/ui-components';
import { PlusCircleFilled } from '@eventespresso/icons';

interface AddPriceModifierButtonProps {
	addPriceModifier: VoidFunction;
	isDisabled: boolean;
}

const AddPriceModifierButton: React.FC<AddPriceModifierButtonProps> = ({ addPriceModifier, isDisabled }) => (
	<IconButton
		icon={PlusCircleFilled}
		isDisabled={isDisabled}
		onClick={addPriceModifier}
		tooltip={__('add new price modifier after this row')}
	/>
);

export default AddPriceModifierButton;
