import React from 'react';
import { __ } from '@wordpress/i18n';

import { IconButton } from '@eventespresso/components';
import { PlusCircleFilled } from '@eventespresso/icons';

interface AddPriceModifierButtonProps {
	addPriceModifier: VoidFunction;
}

const AddPriceModifierButton: React.FC<AddPriceModifierButtonProps> = ({ addPriceModifier }) => (
	<IconButton
		icon={PlusCircleFilled}
		onClick={addPriceModifier}
		tooltip={__('add new price modifier after this row')}
	/>
);

export default AddPriceModifierButton;
