import { useCallback, useEffect } from 'react';

import { __ } from '@eventespresso/i18n';
import { IconButton } from '@eventespresso/ui-components';
import {
	Building,
	Clipboard,
	CalendarOutlined,
	ControlOutlined,
	Discussion,
	FeaturedImage,
	Mail,
	Plugins,
	TicketOutlined,
} from '@eventespresso/icons';

import { moveAfterElement, showSortables } from '../utils';
import './styles.scss';

export const EdtrMenuBar = ({ activeModule, setActiveModule }) => {
	useEffect(() => {
		const adminmenumain = document.getElementById('adminmenumain');
		moveAfterElement(adminmenumain, 'ee-event-editor-menu-bar');
		showSortables();
	});

	const viewEventDetails = useCallback(() => setActiveModule('event-details'), [setActiveModule]);
	const viewVenue = useCallback(() => setActiveModule('venue'), [setActiveModule]);
	const viewEventConfig = useCallback(() => setActiveModule('config'), [setActiveModule]);
	const viewDatesList = useCallback(() => setActiveModule('dates-list'), [setActiveModule]);
	const viewTicketsList = useCallback(() => setActiveModule('tickets-list'), [setActiveModule]);
	const viewRegForm = useCallback(() => setActiveModule('reg-form'), [setActiveModule]);
	const viewNotifications = useCallback(() => setActiveModule('notifications'), [setActiveModule]);
	const viewComments = useCallback(() => setActiveModule('comments'), [setActiveModule]);
	const viewPlugins = useCallback(() => setActiveModule('plugins'), [setActiveModule]);

	return (
		<div id='ee-event-editor-menu-bar' className='ee-event-editor__menu-bar'>
			<IconButton
				active={activeModule === 'event-details'}
				borderless
				noPadding
				transparentBg
				icon={FeaturedImage}
				onClick={viewEventDetails}
				tooltip={__('Event Details: event title, description, excerpt, and featured image')}
			/>
			<IconButton
				active={activeModule === 'venue'}
				borderless
				noPadding
				transparentBg
				icon={Building}
				onClick={viewVenue}
				tooltip={__('Event Venue: where the event occurs')}
			/>
			<IconButton
				active={activeModule === 'dates-list'}
				borderless
				noPadding
				transparentBg
				icon={CalendarOutlined}
				onClick={viewDatesList}
				tooltip={__('Event Dates: when the event occurs plus ticket assignments for each date')}
			/>
			<IconButton
				active={activeModule === 'tickets-list'}
				borderless
				noPadding
				transparentBg
				icon={TicketOutlined}
				onClick={viewTicketsList}
				tooltip={__('Available Tickets: ticket options and pricing')}
			/>
			<IconButton
				active={activeModule === 'config'}
				borderless
				noPadding
				transparentBg
				icon={ControlOutlined}
				onClick={viewEventConfig}
				tooltip={__('Configuration: registration options, event categories, tags, and templates')}
			/>
			<IconButton
				active={activeModule === 'reg-form'}
				borderless
				noPadding
				transparentBg
				icon={Clipboard}
				onClick={viewRegForm}
				tooltip={__('Registration Form: form builder for gathering information from registrants')}
			/>
			<IconButton
				active={activeModule === 'notifications'}
				borderless
				noPadding
				transparentBg
				icon={Mail}
				onClick={viewNotifications}
				tooltip={__('Notifications: template settings for event related messages')}
			/>
			<IconButton
				active={activeModule === 'comments'}
				borderless
				noPadding
				transparentBg
				icon={Discussion}
				onClick={viewComments}
				tooltip={__('Comments: discussion controls and post comments')}
			/>
			<IconButton
				active={activeModule === 'plugins'}
				borderless
				noPadding
				transparentBg
				icon={Plugins}
				onClick={viewPlugins}
				tooltip={__('Plugins: settings for addons and other plugins')}
			/>
		</div>
	);
};
