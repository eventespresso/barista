import classNames from 'classnames';
import { __ } from '@eventespresso/i18n';
import { MapMarker } from '@eventespresso/icons';

import { addressFormatter } from './addressFormatter';

import './style.scss';

export type AddressProps = {
	address?: string;
	address2?: string;
	city?: string;
	className?: string;
	countryISO?: string;
	countryName?: string;
	inline?: boolean;
	inlineFormat?: string;
	name?: string;
	separator?: string;
	showIcon?: boolean;
	showLabels?: boolean;
	showHeader?: boolean;
	stateName?: string;
	zip?: string;
	labels?: {
		inline?: string;
		address?: string;
		city?: string;
		stateName?: string;
		countryName?: string;
		zip?: string;
	};
};

export const Address: React.FC<AddressProps> = ({
	address,
	address2,
	city,
	className,
	inline,
	inlineFormat,
	countryISO,
	countryName,
	separator,
	showIcon,
	showLabels,
	showHeader,
	stateName,
	zip,
	labels = {},
}) => {
	const addressClass = classNames('ee-address', inline && 'ee-address--inline', className);
	if (inline) {
		const fullAddress = addressFormatter(
			inlineFormat,
			address,
			address2,
			city,
			stateName,
			countryName,
			countryISO,
			zip,
			separator
		);
		return (
			<div className={addressClass}>
				{showHeader && <h5 className='ee-address__header'>{__('Address:')}</h5>}
				<div className='ee-address__line' aria-label={labels.inline ?? ''}>
					{showIcon && <MapMarker />}
					{fullAddress}
				</div>
			</div>
		);
	}
	return (
		<div className={addressClass}>
			{showIcon && <MapMarker />}
			{showHeader && <h5 className='ee-address__header'>{__('Address:')}</h5>}
			{(address || address2) && (
				<div className='ee-address__line'>
					{showLabels && <span className='ee-address__label'>{__('Address:')}</span>}
					<span className='ee-address__value' aria-label={labels.address ?? ''}>
						{address}&nbsp;{address2}
					</span>
				</div>
			)}
			{city && (
				<div className='ee-address__line'>
					{showLabels && <span className='ee-address__label'>{__('City:')}</span>}
					<span className='ee-address__value' aria-label={labels.city ?? ''}>
						{city}
					</span>
				</div>
			)}
			{stateName && (
				<div className='ee-address__line'>
					{showLabels && <span className='ee-address__label'>{__('State:')}</span>}
					<span className='ee-address__value' aria-label={labels.stateName ?? ''}>
						{stateName}
					</span>
				</div>
			)}
			{countryName && (
				<div className='ee-address__line'>
					{showLabels && <span className='ee-address__label'>{__('Country:')}</span>}
					<span className='ee-address__value' aria-label={labels.countryName ?? ''}>
						{countryName}
					</span>
				</div>
			)}
			{zip && (
				<div className='ee-address__line'>
					{showLabels && <span className='ee-address__label'>{__('Zip:')}</span>}
					<span className='ee-address__value' aria-label={labels.zip ?? ''}>
						{zip}
					</span>
				</div>
			)}
		</div>
	);
};
