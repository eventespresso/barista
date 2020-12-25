import { __ } from '@eventespresso/i18n';

import { Button } from '@eventespresso/ui-components';
import { useAddDefaultTaxes } from '../../hooks';

const AddDefaultTaxesButton: React.FC = () => {
	const addDefaultTaxes = useAddDefaultTaxes();

	return <Button onClick={addDefaultTaxes} buttonText={__('Add default taxes')} />;
};

export default AddDefaultTaxesButton;
