import { useEffect } from 'react';
import { moveAfterElement, hideAllExcept } from '../utils';

export const Venue = () => {
	useEffect(() => {
		const submitdiv = document.getElementById('submitdiv');
		moveAfterElement(submitdiv, 'espresso_events_Venues_Hooks_venue_metabox_metabox');
		hideAllExcept(['espresso_events_Venues_Hooks_venue_metabox_metabox']);
	}, []);

	// for now we'll return null until this UI element gets rebuilt in React
	return null;

	// return <div className='ee-event-venue ee-edtr-section'></div>;
};
