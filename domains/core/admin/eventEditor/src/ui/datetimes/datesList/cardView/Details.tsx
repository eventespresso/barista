import { useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { ADMIN_ROUTES, EMPTY_OBJECT } from '@eventespresso/constants';
import { SimpleTextEditorModal } from '@eventespresso/ee-components';
import { useConfig, getAdminUrl } from '@eventespresso/services';
import { useDatetimeMutator, useEventId, useVenues, hooks } from '@eventespresso/edtr-services';
import { entityListToSelectOptions } from '@eventespresso/utils';
import { findEntityByGuid } from '@eventespresso/predicates';
import { VenueSelector } from '@eventespresso/ui-components';

import DateDetailsPanel from './DateDetailsPanel';
import { EditableName } from '../editable';
import useDateCardDetailsItems from '../../hooks/useDateCardDetailsItems';
import type { DateItemProps } from '../types';

const Details: React.FC<DateItemProps> = ({ entity: datetime }) => {
	const { siteUrl } = useConfig();

	const adminUrl = useMemo(() => {
		return getAdminUrl({ adminSiteUrl: siteUrl.admin, page: ADMIN_ROUTES.REGISTRATIONS });
	}, [siteUrl.admin]);

	const eventId = useEventId();

	const { updateEntity } = useDatetimeMutator(datetime.id);

	const onUpdate = useCallback(
		(description: string): void => {
			updateEntity({ description });
		},
		[updateEntity]
	);

	const detailsItems = useDateCardDetailsItems(datetime.id);

	const additionalProps = useMemo(() => {
		return hooks.applyFilters('eventEditor.datetimes.inlineDescriptionProps', EMPTY_OBJECT, datetime);
	}, [datetime]);

	const venues = useVenues();
	const options = useMemo(() => entityListToSelectOptions(venues), [venues]);
	const selectedVenue = useMemo(() => findEntityByGuid(venues)(datetime.venue), [datetime, venues]);
	console.log('%c selectedVenue', 'color: DodgerBlue;', selectedVenue);

	const onChangeVenue = useCallback(
		(venue: string) => {
			console.log('%c venue', 'color: Yellow;', venue);
			// lets avoid unnecessary mutation
			if (datetime.venue !== venue) {
				console.log('%c venue', 'color: LimeGreen;', venue);
				updateEntity({ venue });
			}
		},
		[datetime?.venue, updateEntity]
	);

	return (
		<>
			<EditableName className='entity-card-details__name' entity={datetime} />

			<SimpleTextEditorModal
				className='entity-card-details__text'
				onUpdate={onUpdate}
				text={datetime.description}
				title={__('Edit description')}
				tooltip={__('edit description…')}
				{...additionalProps}
			/>

			<VenueSelector
				className='ee-event-venue'
				inline
				noBorderColor
				onChangeValue={onChangeVenue}
				options={options}
				showIcon
				value={selectedVenue.id}
			/>

			{detailsItems}

			<DateDetailsPanel adminUrl={adminUrl} entity={datetime} eventId={eventId} />
		</>
	);
};

export default Details;
