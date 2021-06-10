import { useState } from 'react';

import { useIsRehydrated } from '@eventespresso/data';
import { PluginArea } from '@eventespresso/plugins';
import { getRegisteredContainers } from '@edtrServices/utils';

import { DatesList } from './datetimes/datesList';
import EventRegistrationOptions from './EventRegistrationOptions';
import { TicketsList } from './tickets/ticketsList';
import { EdtrMenuBar } from './EdtrMenuBar';
import EventDescription from './EventDescription';
import { VenueDetails } from './venue';

import { RegistrationForm } from './registrationForm';
import { Comments } from './Comments';
import { Notifications } from './Notifications';
import Init from './Init';
// fire up the service and UI element registry
import './registryInit';
import './styles.scss';

const containers = getRegisteredContainers();

const EventEditor: React.FC = () => {
	const [isRehydrated] = useIsRehydrated();
	const [activeModule, setActiveModule] = useState('event-details');

	if (!isRehydrated) {
		return <Init />;
	}

	let module: {};
	switch (activeModule) {
		case 'event-details':
			module = <EventDescription />;
			break;
		case 'venue':
			module = <VenueDetails />;
			break;
		case 'config':
			module = <EventRegistrationOptions />;
			break;
		case 'dates-list':
			module = <DatesList />;
			break;
		case 'tickets-list':
			module = <TicketsList />;
			break;
		case 'reg-form':
			module = <RegistrationForm />;
			break;
		case 'comments':
			module = <Comments />;
			break;
		case 'notifications':
			module = <Notifications />;
			break;
		case 'plugins':
			module = <PluginArea />;
			break;
	}

	return (
		<div className='ee-event-editor'>
			<EdtrMenuBar activeModule={activeModule} setActiveModule={setActiveModule} />
			<div className='ee-event-editor__modules'>
				{module}
				{containers}
			</div>
		</div>
	);
};

export default EventEditor;
