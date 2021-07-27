import { useCallback, useState } from 'react';
import classNames from 'classnames';

import { __ } from '@eventespresso/i18n';
import type { Event, Datetime, Venue } from '@eventespresso/edtr-services';

import { Link } from '../Button';
import { SelectWithLabel } from '../Select';
import { Building } from '@eventespresso/icons';

import './styles.scss';

interface VenueSelectorProps extends React.ComponentProps<typeof SelectWithLabel> {
	createVenueLink?: string;
	entityToUpdate: Event | Datetime;
	inline?: boolean;
	showIcon?: boolean;
	updateEntity: ({ venue: string }) => Promise<boolean>;
	venue?: Venue;
}

export const VenueSelector: React.FC<VenueSelectorProps> = ({
	createVenueLink,
	entityToUpdate,
	inline,
	showIcon,
	updateEntity,
	venue,
	...props
}) => {
	// tracking selected venue ID internally so that things like keyboard selection don't trigger updates immediately
	const [selectedVenueId, setSelectedVenueId] = useState(venue.id || '');

	const onChangeInstantValue = useCallback((newValue: string) => {
		setSelectedVenueId(newValue);
	}, []);

	const onChangeValue = useCallback(
		(venue: string) => {
			// lets avoid unnecessary mutation
			if (entityToUpdate.venue !== venue) {
				updateEntity({ venue });
			}
		},
		[entityToUpdate?.venue, updateEntity]
	);

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
			<SelectWithLabel
				flow={inline ? 'inline' : null}
				size='small'
				{...props}
				className={className}
				onChangeValue={onChangeValue}
				onChangeInstantValue={onChangeInstantValue}
				value={selectedVenueId}
			/>
			{addNewVenue}
		</div>
	);
};
