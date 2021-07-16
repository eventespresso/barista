import { useIsRehydrated } from '@eventespresso/data';
import { PluginArea } from '@eventespresso/plugins';

import { getRegisteredContainers } from '@edtrServices/utils';
import { DatesList } from './datetimes/datesList';
import EventRegistrationOptions from './EventRegistrationOptions';
import { TicketsList } from './tickets/ticketsList';
import EventDescription from './EventDescription';
import { VenueDetails } from './venue';

import { RegistrationForm } from './registrationForm';
import Init from './Init';
// fire up the service and UI element registry
import './registryInit';
import './styles.scss';

const containers = getRegisteredContainers();

const EventEditor: React.FC = () => {
	const [isRehydrated] = useIsRehydrated();

	return isRehydrated ? (
		<>
			<EventDescription />
			<EventRegistrationOptions />
			<DatesList />
			<TicketsList />
			<VenueDetails />
			<RegistrationForm />
			<PluginArea />
			{containers}
		</>
	) : (
		<Init />
	);
};

export default EventEditor;
