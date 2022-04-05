import { __ } from '@eventespresso/i18n';
import type { PriceModifierProps } from '../types';

const PriceIdInput: React.FC<PriceModifierProps> = ({ price }) => {
	return (
		<span className='ee-price-id' aria-label={__('price id')}>
			{price.dbId || 0}
		</span>
	);
};

export default PriceIdInput;
