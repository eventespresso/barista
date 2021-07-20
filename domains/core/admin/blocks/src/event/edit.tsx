import { withDataProvider } from '@eventespresso/data';
import { Controls } from './controls';
import { DisplayField } from './DisplayField';

const EventAttendeesEdit: React.FC = (props) => {
	return (
		<>
			<DisplayField {...props} />
			<Controls {...props} />
		</>
	);
};

export default withDataProvider(EventAttendeesEdit);
