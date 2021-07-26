import { __ } from '@eventespresso/i18n';
import classNames from 'classnames';

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
	showLabels?: boolean;
	showHeader?: boolean;
	stateName?: string;
	zip?: string;
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
	showLabels,
	showHeader,
	stateName,
	zip,
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
			zip,
			separator
		);
		return (
			<div className={addressClass}>
				{showHeader && <h5 className='ee-address__header'>{__('Address:')}</h5>}
				<div className='ee-address__line'>{fullAddress}</div>
			</div>
		);
	}
	return (
		<div className={addressClass}>
			{showHeader && <h5 className='ee-address__header'>{__('Address:')}</h5>}
			{(address || address2) && (
				<div className='ee-address__line'>
					{showLabels && <span className='ee-address__label'>{__('Address:')}</span>}
					<span className='ee-address__value'>
						{address}&nbsp;{address2}
					</span>
				</div>
			)}
			{city && (
				<div className='ee-address__line'>
					{showLabels && <span className='ee-address__label'>{__('City:')}</span>}
					<span className='ee-address__value'>{city}</span>
				</div>
			)}
			{stateName && (
				<div className='ee-address__line'>
					{showLabels && <span className='ee-address__label'>{__('State:')}</span>}
					<span className='ee-address__value'>{stateName}</span>
				</div>
			)}
			{countryName && (
				<div className='ee-address__line'>
					{showLabels && <span className='ee-address__label'>{__('Country:')}</span>}
					<span className='ee-address__value'>{countryName}</span>
				</div>
			)}
			{zip && (
				<div className='ee-address__line'>
					{showLabels && <span className='ee-address__label'>{__('Zip:')}</span>}
					<span className='ee-address__value'>{zip}</span>
				</div>
			)}
		</div>
	);
};
