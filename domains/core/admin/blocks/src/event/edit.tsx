import { withDataProvider } from '@eventespresso/data';

import { Controls } from './controls';
import { DisplayField } from './DisplayField';
import { EventFieldEditProps } from './types';

const EventAttendeesEdit: React.FC<EventFieldEditProps> = (props) => {
	return (
		<>
			<DisplayField {...props} />
			<Controls {...props} />
		</>
	);
};

export default withDataProvider(EventAttendeesEdit);
