import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@eventespresso/i18n';

import attributes from './attributes';
import EventAttendeesEdit from './edit';
import type { EventAttendeesAttributes } from './types';
import './style.scss';

registerBlockType<EventAttendeesAttributes>('eventespresso/event-attendees', {
	title: __('Event Attendees'),
	description: __('Displays a list of people that have registered for the specified event'),
	icon: 'groups',
	category: 'event-espresso',
	keywords: [__('event'), __('attendees'), __('list')],
	attributes,
	edit: EventAttendeesEdit,
	save() {
		return null;
	},
});
