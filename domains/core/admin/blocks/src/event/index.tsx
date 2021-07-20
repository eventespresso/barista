import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@eventespresso/i18n';

import Edit from './edit';

registerBlockType('eventespresso/event-field', {
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
	},
	edit: Edit,
	save() {
		return null;
	},
	// TODO migrate attributes to use GUID
});
