import { useCallback, useMemo, useState } from 'react';

import { __ } from '@eventespresso/i18n';
import { useVenues, useEventMutator, useEvent } from '@eventespresso/edtr-services';
import { entityListToSelectOptions } from '@eventespresso/utils';
import { findEntityByGuid } from '@eventespresso/predicates';
import { AddressView, Container, Heading, SelectWithLabel, Link } from '@eventespresso/ui-components';

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
	const thumbnail = useMemo(() => {
		return { __html: selectedVenue?.thumbnail };
	}, [selectedVenue]);

	const createVenueLink = useVenueLink('create_new');
	const editVenueLink = useVenueLink('edit', selectedVenue?.dbId);

	return (
		<Container classes={classes} header={header}>
			{selectedVenue && (
				<div className='ee-event-venue__card'>
					<div className='ee-event-venue__thumbnail' dangerouslySetInnerHTML={thumbnail} />
					<div className='ee-event-venue__details'>
						<Heading as='h4' className='ee-event-venue__venue-name'>
							{selectedVenue?.name}
						</Heading>
						<AddressView className='ee-event-venue__address' {...selectedVenue} />
						<div>
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
