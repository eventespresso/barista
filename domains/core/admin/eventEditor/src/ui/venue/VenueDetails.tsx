import { useCallback, useMemo, useState } from 'react';

import { __, sprintf } from '@eventespresso/i18n';
import { Image } from '@eventespresso/adapters';
import { useEvent, useEventMutator, useVenues } from '@eventespresso/edtr-services';
import { isInfinite } from '@eventespresso/utils';
import { findEntityByGuid } from '@eventespresso/predicates';
import { Address, Container, Heading, TextLink, VenueSelector } from '@eventespresso/ui-components';
import { MapMarker, Phone, VenueSeat } from '@eventespresso/icons';

import { useVenueLink } from './useVenueLink';

import './styles.scss';

const classes = {
	container: 'ee-edtr-section ee-event-venue',
};

const header = (
	<Heading as='h3' className='ee-edtr-section-heading'>
		{__('Venue Details')}
	</Heading>
);

export const VenueDetails: React.FC = () => {
	const event = useEvent();
	const { updateEntity } = useEventMutator(event?.id);
	const [selectedVenueId, setSelectedVenueId] = useState(event?.venue || '');

	const venues = useVenues();
	// need to make a copy else we can't sort it
	const sortedVenues = useMemo(() => [...venues], [venues]);
	// create a collator to sort the venues by name using the current locale and natural sort order
	const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
	sortedVenues.sort((a, b) => collator.compare(a.name, b.name));

	const selectedVenue = useMemo(
		() => findEntityByGuid(sortedVenues)(selectedVenueId),
		[selectedVenueId, sortedVenues]
	);

	const createVenueLink = useVenueLink('create_new');
	const editVenueLink = useVenueLink('edit', selectedVenue?.dbId);

	const capacity = selectedVenue?.capacity;
	const venueCapacity = isInfinite(capacity)
		? __('unlimited space')
		: sprintf(
				/* translators: %d venue capacity */
				__('Space for up to %d people'),
				selectedVenue?.capacity
		  );

	const onChangeInstantValue = useCallback((newValue) => setSelectedVenueId(newValue), []);

	const onChangeValue = useCallback((venue) => updateEntity({ venue }), [updateEntity]);
	const thumbnail = selectedVenue?.thumbnail;

	const addressLabels = useMemo(
		() => ({
			inline: __('Venue address'),
		}),
		[]
	);

	return (
		<Container aria-label={__('Venue Details card')} classes={classes} header={header}>
			{selectedVenue && (
				<div className='ee-event-venue__card'>
					{thumbnail ? (
						<div className='ee-event-venue__thumbnail'>
							<Image src={thumbnail} alt={selectedVenue?.name} />
						</div>
					) : (
						<div className='ee-event-venue__thumbnail ee-event-venue__thumbnail--no-image'>
							{__('no image')}
						</div>
					)}
					<div className='ee-event-venue__properties'>
						<Heading as='h4' className='ee-event-venue__venue-name' aria-label={__('Venue name')}>
							{selectedVenue?.name}
						</Heading>
						<div className='ee-event-venue__desc'>
							<p>{selectedVenue?.shortDescription}</p>
						</div>
						<div className='ee-event-venue__details'>
							<div className='ee-event-venue__detail'>
								<span className='ee-event-venue__detail-label'>
									<MapMarker />
								</span>
								<span className='ee-event-venue__detail-value'>
									<Address
										className='ee-event-venue__address'
										inline
										labels={addressLabels}
										{...selectedVenue}
									/>
								</span>
							</div>
							<div className='ee-event-venue__detail'>
								<span className='ee-event-venue__detail-label'>
									<VenueSeat />
								</span>
								<span className='ee-event-venue__detail-value' aria-label={__('Venue capacity')}>
									{venueCapacity}
								</span>
							</div>
							<div className='ee-event-venue__detail'>
								<span className='ee-event-venue__detail-label'>
									<Phone />
								</span>
								<span className='ee-event-venue__detail-value' aria-label={__('Venue telephone')}>
									{selectedVenue?.phone || '(###) ###-####'}
								</span>
							</div>
						</div>
						<div className='ee-event-venue__actions'>
							<TextLink className='ee-event-venue__edit-link' href={editVenueLink} showExternalIcon>
								{__('Edit this Venue')}
							</TextLink>
						</div>
					</div>
				</div>
			)}
			<VenueSelector
				className='ee-event-venue'
				createVenueLink={createVenueLink}
				label={__('Select a Venue for the Event')}
				onChangeValue={onChangeValue}
				onChangeInstantValue={onChangeInstantValue}
				value={event?.venue}
				venueName={selectedVenue?.name}
				venues={sortedVenues}
			/>
		</Container>
	);
};
