import { PluginArea } from '@eventespresso/plugins';

import { useEditorInitialization } from '../hooks';
import { Spinner } from '@eventespresso/adapters';
import { getRegisteredContainers } from '@edtrServices/utils';

import { DatesList } from './datetimes/datesList';
import EventRegistrationOptions from './EventRegistrationOptions';
import { TicketsList } from './tickets/ticketsList';
import EventDescription from './EventDescription';
import { VenueDetails } from './venue';
import { RegistrationForm } from './registrationForm';

// fire up the service and UI element registry
import './registryInit';
import './styles.scss';

const containers = getRegisteredContainers();

const EventEditor: React.FC = () => {
	const isRehydrated = useEditorInitialization();

	if (!isRehydrated) {
		return <Spinner />;
	}

	return (
		<>
			<EventDescription />
			<EventRegistrationOptions />
			<VenueDetails />
			<DatesList />
			<TicketsList />
			<RegistrationForm />
			<PluginArea />
			{containers}
		</>
	);
};

export default EventEditor;
