import { useCallback, useMemo, useState } from 'react';

import { __ } from '@eventespresso/i18n';
import { useVenues, useEventMutator, useEvent } from '@eventespresso/edtr-services';
import { entityListToSelectOptions } from '@eventespresso/utils';
import { findEntityByGuid } from '@eventespresso/predicates';
import { AddressView, Container, Heading, SelectWithLabel, Link } from '@eventespresso/ui-components';

import { useVenueLink } from './useVenueLink';

const classes = {
	container: 'ee-edtr-section',
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

	const createVenueLink = useVenueLink('create_new');
	const editVenueLink = useVenueLink('edit', selectedVenue?.dbId);

	return (
		<Container id='ee-event-venue-details' classes={classes} header={header}>
			<SelectWithLabel
				id='ee-event-venue'
				flow='inline'
				label={__('Select from Venue Manager List')}
				onChangeValue={onChangeValue}
				onChangeInstantValue={onChangeInstantValue}
				options={options}
				size='small'
				value={selectedVenueId}
			/>
			<div>
				{selectedVenue && (
					<>
						<AddressView {...selectedVenue} />
						<Link href={editVenueLink}>{__('Edit this Venue')}</Link>
						<p>{__('or')}</p>
					</>
				)}
				<Link href={createVenueLink}>{__('Add new Venue')}</Link>
			</div>
		</Container>
	);
};
