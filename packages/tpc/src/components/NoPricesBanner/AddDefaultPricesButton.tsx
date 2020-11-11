import React from 'react';
import { __ } from '@eventespresso/i18n';

import { Button } from '@eventespresso/components';
import { useAddDefaultPrices } from '../../hooks';

const AddDefaultPricesButton: React.FC = () => {
	const addDefaultPrices = useAddDefaultPrices();

	return <Button onClick={addDefaultPrices} buttonText={__('Add default prices')} size='big' />;
};

export default AddDefaultPricesButton;
