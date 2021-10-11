import { SortByControl as SortByControlUI } from '@eventespresso/ee-components';
import {
	Ticket,
	useFilteredTicketIds,
	useReorderTickets,
	useTicketsListFilterState,
} from '@eventespresso/edtr-services';
import { ticketDroppableId } from '@eventespresso/constants';
import { objectToSelectOptions } from '@eventespresso/utils';
import { TypeName } from '@eventespresso/services';
import type { SortByControlProps } from '@eventespresso/ee-components';

import { labels, sortByOptions } from '../options';
import DraggableTicket from './DraggableTicket';

const options = objectToSelectOptions(sortByOptions);

const renderDraggableItem: SortByControlProps<Ticket>['renderDraggableItem'] = (ticket) => ({
	...ticket,
	content: <DraggableTicket {...ticket} />,
});

/**
 * filter for controlling the sorting of a list of Event Dates
 */
const SortByControl: React.FC = () => {
	const { sortBy, setSortBy } = useTicketsListFilterState();
	const filteredTicketIds = useFilteredTicketIds();
	const {
		allReorderedEntities: draggableItems,
		sortResponder,
		updateEntityList,
	} = useReorderTickets(filteredTicketIds);

	return (
		<SortByControlUI
			draggableItems={draggableItems}
			droppableId={ticketDroppableId}
			entityType={TypeName.tickets}
			id='ee-tickets-list-sort-by-control'
			label={labels.sortBy}
			onChangeValue={setSortBy}
			options={options}
			onSort={sortResponder}
			onSubmit={updateEntityList}
			renderDraggableItem={renderDraggableItem}
			value={sortBy}
		/>
	);
};

export default SortByControl;
