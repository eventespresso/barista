import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { Link } from '../Button';
import { SelectWithLabel } from '../Select';
import { Building } from '@eventespresso/icons';

import type { InlineSelectProps } from '../Select';

import './styles.scss';

interface VenueSelectorProps extends InlineSelectProps {
	createVenueLink?: string;
	inline?: boolean;
	showIcon?: boolean;
}

export const VenueSelector: React.FC<VenueSelectorProps> = ({ createVenueLink, inline, showIcon, ...props }) => {
	const className = classNames('ee-venue-selector__input', props.className);
	const wrapperClass = classNames('ee-venue-selector', inline && 'ee-venue-selector--inline');

	const addNewVenue = createVenueLink && (
		<div className='ee-venue-selector__add-new'>
			<Link className='ee-venue-selector__add-new-link' href={createVenueLink}>
				{__('Add New Venue')}
			</Link>
		</div>
	);

	return (
		<div className={wrapperClass}>
			{showIcon && <Building />}
			<SelectWithLabel flow={inline ? 'inline' : null} size='small' {...props} className={className} />
			{addNewVenue}
		</div>
	);
};
