import { __ } from '@eventespresso/i18n';

import './style.scss';

export type AddressViewProps = {
	address?: string;
	address2?: string;
	city?: string;
	countryName?: string;
	name?: string;
	stateName?: string;
	zip?: string;
};

export const AddressView: React.FC<AddressViewProps> = ({ address, address2, city, countryName, stateName, zip }) => {
	return (
		<div className='ee-address-view'>
			<div className='ee-address-view__item'>
				<span className='ee-address-view__item--label'>{__('Address:')}</span>
				<span className='ee-address-view__item--value'>
					{address}&nbsp;{address2}
				</span>
			</div>
			<div className='ee-address-view__item'>
				<span className='ee-address-view__item--label'>{__('City:')}</span>
				<span className='ee-address-view__item--value'>{city}</span>
			</div>
			<div className='ee-address-view__item'>
				<span className='ee-address-view__item--label'>{__('State:')}</span>
				<span className='ee-address-view__item--value'>{stateName}</span>
			</div>
			<div className='ee-address-view__item'>
				<span className='ee-address-view__item--label'>{__('Country:')}</span>
				<span className='ee-address-view__item--value'>{countryName}</span>
			</div>
			<div className='ee-address-view__item'>
				<span className='ee-address-view__item--label'>{__('Zip:')}</span>
				<span className='ee-address-view__item--value'>{zip}</span>
			</div>
		</div>
	);
};
