import { useCallback, useMemo } from 'react';

import { __ } from '@eventespresso/i18n';
import { EMPTY_OBJECT } from '@eventespresso/constants';
import { SimpleTextEditorModal } from '@eventespresso/ee-components';
import { useDatetimeMutator, useVenues, hooks } from '@eventespresso/edtr-services';
import { VenueSelector } from '@eventespresso/ui-components';
import { findEntityByGuid } from '@eventespresso/predicates';

import DateDetailsPanel from './DateDetailsPanel';
import { EditableName } from '../editable';
import useDateCardDetailsItems from '../../hooks/useDateCardDetailsItems';
import type { DateItemProps } from '../types';

const Details: React.FC<DateItemProps> = ({ entity: datetime }) => {
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
	const selectedVenue = useMemo(() => findEntityByGuid(venues)(datetime?.venue), [datetime?.venue, venues]);

	const onChangeValue = useCallback((venue) => updateEntity({ venue }), [updateEntity]);

	return (
		<>
			<EditableName className='entity-card-details__name' entity={datetime} />

			<SimpleTextEditorModal
				className='entity-card-details__text'
				onUpdate={onUpdate}
				text={datetime.description || __('add description…')}
				title={__('Edit description')}
				tooltip={__('click to edit description…')}
				{...additionalProps}
			/>

			<VenueSelector
				align='center'
				className='ee-event-venue'
				inline
				noBorderColor
				onChangeValue={onChangeValue}
				value={datetime?.venue}
				venueName={selectedVenue?.name}
				venues={venues}
			/>

			{detailsItems}

			<DateDetailsPanel entity={datetime} />
		</>
	);
};

export default Details;
