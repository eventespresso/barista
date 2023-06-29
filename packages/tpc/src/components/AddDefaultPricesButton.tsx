import { __ } from '@eventespresso/i18n';

import { Button } from '@eventespresso/ui-components';
import { useAddDefaultPrices } from '../hooks';

const AddDefaultPricesButton: React.FC = () => {
	const addDefaultPrices = useAddDefaultPrices();

	return <Button onClick={addDefaultPrices} buttonText={__('Add default prices')} />;
};

export default AddDefaultPricesButton;
