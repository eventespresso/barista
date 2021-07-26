import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@eventespresso/i18n';

import Edit from './edit';
import { EventFieldAttributes } from './types';

registerBlockType<EventFieldAttributes>('eventespresso/event-field', {
	title: __('Event Field'),
	description: __('Displays the selected field of an event'),
	icon: 'editor-paragraph',
	category: 'event-espresso',
	keywords: [__('event'), __('field')],
	attributes: {
		event: {
			type: 'string',
			default: '',
		},
		field: {
			type: 'string',
			default: '',
		},
		style: {
			type: 'object',
			default: {},
		},
	},
	edit: Edit,
	save() {
		return null;
	},
});
