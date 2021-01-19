import { RangeFormat } from '@eventespresso/dates';
import type { Datetime } from '@eventespresso/edtr-services';

const formatTokens = { month: 'LLL' };

const DraggableDatetime: React.FC<Datetime> = ({ dbId, endDate, name, startDate }) => (
	<>
		<span>{dbId})</span>
		<span>{name}: </span>
		<RangeFormat endDate={endDate} formatTokens={formatTokens} showTime startDate={startDate} />
	</>
);

export default DraggableDatetime;
