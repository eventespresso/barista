import { useCallback, useEffect } from 'react';

import { __ } from '@eventespresso/i18n';
import { AdvancedTextEditor } from '@eventespresso/ee-components';
import { Heading } from '@eventespresso/ui-components';
import { useEvent, useEventMutator } from '@eventespresso/edtr-services';
import { withFeature } from '@eventespresso/services';

import { moveAfterElement, moveBeforeElement, hideAllExcept } from './utils';

type AdvancedTextEditorProps = React.ComponentProps<typeof AdvancedTextEditor>;

const EventDescription: React.FC = () => {
	const event = useEvent();

	const { updateEntity: updateEvent } = useEventMutator(event?.id);

	const onChangeDescription = useCallback<AdvancedTextEditorProps['onChange']>(
		(newDescription) => {
			if (newDescription !== event?.description) {
				updateEvent({ description: newDescription });
			}
		},
		[event?.description, updateEvent]
	);

	useEffect(() => {
		const eventDescription = document.querySelector('.ee-event-description');
		moveBeforeElement(eventDescription, 'submitdiv');
		moveBeforeElement(eventDescription, 'titlediv');
		moveAfterElement(eventDescription, 'postimagediv');
		moveAfterElement(eventDescription, 'postexcerpt');
		const divsToKeep = ['titlediv', 'postexcerpt', 'postimagediv'];
		hideAllExcept(divsToKeep);
	}, []);

	return (
		<div className='ee-event-description ee-edtr-section'>
			<Heading as='h3' className='ee-edtr-section-heading'>
				{__('Event Description')}
			</Heading>
			<AdvancedTextEditor debounceDelay={4000} defaultValue={event?.description} onChange={onChangeDescription} />
		</div>
	);
};

export default withFeature('use_event_description_rte')(EventDescription);
