import { CurrencyDisplay, RangeFormat } from '@eventespresso/ee-components';
import type { Ticket } from '@eventespresso/constants';

const formatTokens = { month: 'LLL' };

const DraggableTicket: React.FC<Ticket> = ({ dbId, endDate, name, price, startDate }) => (
	<>
		<span>{dbId})</span>
		<span>{name}: </span>
		<span>
			<CurrencyDisplay value={price} />
		</span>
		<span>-</span>
		<RangeFormat endDate={endDate} formatTokens={formatTokens} showTime startDate={startDate} />
	</>
);

export default DraggableTicket;
