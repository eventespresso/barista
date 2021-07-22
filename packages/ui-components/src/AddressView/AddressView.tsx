import { __ } from '@eventespresso/i18n';
import classNames from 'classnames';

import './style.scss';

export type AddressViewProps = {
	address?: string;
	address2?: string;
	city?: string;
	className?: string;
	countryName?: string;
	name?: string;
	showLabels?: boolean;
	stateName?: string;
	zip?: string;
};

export const AddressView: React.FC<AddressViewProps> = ({
	address,
	address2,
	city,
	className,
	countryName,
	showLabels = false,
	stateName,
	zip,
}) => {
	const addressClass = classNames('ee-address-view', className);
	return (
		<div className={addressClass}>
			{showLabels && <h5 className='ee-address-view__item--label'>{__('Address:')}</h5>}
			{(address || address2) && (
				<div className='ee-address-view__item'>
					<span className='ee-address-view__item--value'>
						{address}&nbsp;{address2}
					</span>
				</div>
			)}
			{city && (
				<div className='ee-address-view__item'>
					{showLabels && <span className='ee-address-view__item--label'>{__('City:')}</span>}
					<span className='ee-address-view__item--value'>{city}</span>
				</div>
			)}
			{stateName && (
				<div className='ee-address-view__item'>
					{showLabels && <span className='ee-address-view__item--label'>{__('State:')}</span>}
					<span className='ee-address-view__item--value'>{stateName}</span>
				</div>
			)}
			{countryName && (
				<div className='ee-address-view__item'>
					{showLabels && <span className='ee-address-view__item--label'>{__('Country:')}</span>}
					<span className='ee-address-view__item--value'>{countryName}</span>
				</div>
			)}
			{zip && (
				<div className='ee-address-view__item'>
					{showLabels && <span className='ee-address-view__item--label'>{__('Zip:')}</span>}
					<span className='ee-address-view__item--value'>{zip}</span>
				</div>
			)}
		</div>
	);
};
