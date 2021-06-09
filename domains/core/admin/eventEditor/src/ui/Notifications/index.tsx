import { useEffect } from 'react';
import { moveAfterElement, hideAllExcept } from '../utils';

export const Notifications = () => {
	useEffect(() => {
		const submitdiv = document.getElementById('submitdiv');
		moveAfterElement(submitdiv, 'espresso_events_Messages_Hooks_Extend_messages_metabox_metabox');
		hideAllExcept(['espresso_events_Messages_Hooks_Extend_messages_metabox_metabox']);
	}, []);

	// for now we'll return null until this UI element gets rebuilt in React
	return null;
	// return <div className='ee-notifications ee-edtr-section'></div>;
};
