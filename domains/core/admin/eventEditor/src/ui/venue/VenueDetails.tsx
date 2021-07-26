import { useCallback, useMemo, useState } from 'react';

import { __, sprintf } from '@eventespresso/i18n';
import { Image } from '@eventespresso/adapters';
import { useVenues, useEventMutator, useEvent } from '@eventespresso/edtr-services';
import { entityListToSelectOptions } from '@eventespresso/utils';
import { findEntityByGuid } from '@eventespresso/predicates';
import { Address, Container, Heading, SelectWithLabel, Link } from '@eventespresso/ui-components';
import { MapMarker, Phone, Seat } from '@eventespresso/icons';

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

	const [selectedVenueId, setSelectedVenueId] = useState(event?.venue || '');

	const { updateEntity: updateEvent } = useEventMutator(event?.id);

	const onChangeInstantValue = useCallback((newValue: string) => {
		setSelectedVenueId(newValue);
	}, []);

	const onChangeValue = useCallback(
		(newVenue: string) => {
			// lets avoid unnecessary mutation
			if (event?.venue !== newVenue) {
				updateEvent({ venue: newVenue });
			}
		},
		[event?.venue, updateEvent]
	);

	const venues = useVenues();
	const options = useMemo(() => entityListToSelectOptions(venues), [venues]);
	const selectedVenue = useMemo(() => findEntityByGuid(venues)(selectedVenueId), [selectedVenueId, venues]);
	console.log('%c selectedVenue', 'color: Yellow;', selectedVenue);

	const createVenueLink = useVenueLink('create_new');
	const editVenueLink = useVenueLink('edit', selectedVenue?.dbId);

	const capacity = selectedVenue?.capacity;
	const venueCapacity =
		capacity === -1
			? __('unlimited space')
			: sprintf(
					/* translators: %s venue capacity */
					__('Space for up to %s people'),
					`${selectedVenue?.capacity}`
			  );

	return (
		<Container classes={classes} header={header}>
			{selectedVenue && (
				<div className='ee-event-venue__card'>
					<div className='ee-event-venue__thumbnail'>
						<Image src={selectedVenue?.thumbnail} alt={selectedVenue?.name} />
					</div>
					<div className='ee-event-venue__properties'>
						<Heading as='h4' className='ee-event-venue__venue-name'>
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
									<Address className='ee-event-venue__address' inline {...selectedVenue} />
								</span>
							</div>
							<div className='ee-event-venue__detail'>
								<span className='ee-event-venue__detail-label'>
									<Seat />
								</span>
								<span className='ee-event-venue__detail-value'>{venueCapacity}</span>
							</div>
							<div className='ee-event-venue__detail'>
								<span className='ee-event-venue__detail-label'>
									<Phone />
								</span>
								<span className='ee-event-venue__detail-value'>
									{selectedVenue?.phone || '(###) ###-####'}
								</span>
							</div>
						</div>
						<div className='ee-event-venue__actions'>
							<Link className='ee-event-venue__edit-link' href={editVenueLink}>
								{__('Edit this Venue')}
							</Link>
						</div>
					</div>
				</div>
			)}
			<div className='ee-event-venue__editing'>
				<SelectWithLabel
					className='ee-event-venue__selector'
					flow='inline'
					label={__('Select a different Venue')}
					onChangeValue={onChangeValue}
					onChangeInstantValue={onChangeInstantValue}
					options={options}
					size='small'
					value={selectedVenueId}
				/>
				<div>
					<Link className='ee-event-venue__add-new-link' href={createVenueLink}>
						{__('Add new Venue')}
					</Link>
				</div>
			</div>
		</Container>
	);
};
