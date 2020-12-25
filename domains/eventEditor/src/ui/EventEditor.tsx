import { useIsRehydrated } from '@eventespresso/edtr-services';

import { getRegisteredContainers } from '@edtrServices/utils';
import { DatesList } from './datetimes/datesList';
import EventRegistrationOptions from './EventRegistrationOptions';
import { TicketsList } from './tickets/ticketsList';
import EventDescription from './EventDescription';
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
			{containers}
		</>
	) : (
		<Init />
	);
};

export default EventEditor;
