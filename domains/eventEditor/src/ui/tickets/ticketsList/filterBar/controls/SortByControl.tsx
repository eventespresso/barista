import { useCallback } from 'react';
import { format } from 'date-fns';

import { CurrencyDisplay, SortByControl as SortByControlUI } from '@eventespresso/ee-components';
import {
	TicketEdge,
	useFilteredTicketIds,
	useReorderTickets,
	useTicketQueryOptions,
	useTicketsListFilterState,
	useUpdateTicketList,
} from '@eventespresso/edtr-services';
import { ticketDroppableId } from '@eventespresso/constants';
import { objectToSelectOptions } from '@eventespresso/utils';
import { TypeName } from '@eventespresso/services';

import { labels, sortByOptions } from './options';

const options = objectToSelectOptions(sortByOptions);

/**
 * filter for controlling the sorting of a list of Event Dates
 */
const SortByControl: React.FC = () => {
	const { sortBy, setSortBy } = useTicketsListFilterState();
	const filteredTicketIds = useFilteredTicketIds();
	const { allOrderedEntities, done, sortResponder } = useReorderTickets(filteredTicketIds);

	const queryOptions = useTicketQueryOptions();
	const updateTicketList = useUpdateTicketList();

	const renderDraggableItems = useCallback(
		(item) => ({
			...item,
			content: (
				<>
					<span>{item.dbId})</span>
					<span>{item.name}: </span>
					<span>
						<CurrencyDisplay value={item.price} />
					</span>
					<span>-</span>
					<span>{format(new Date(item.startDate), 'LLL')}</span>
					<span>
						{format(new Date(item.startDate), 'd')} - {format(new Date(item.endDate), 'd')}
					</span>
					<span>{format(new Date(item.endDate), 'yyyy')}</span>
				</>
			),
		}),
		[]
	);

	const updateEntityList = useCallback(() => {
		const espressoTickets: TicketEdge = {
			nodes: allOrderedEntities,
			__typename: 'EspressoRootQueryTicketsConnection',
		};

		done();

		updateTicketList({
			...queryOptions,
			data: {
				espressoTickets,
			},
		});
	}, [allOrderedEntities, done, queryOptions, updateTicketList]);

	return (
		<SortByControlUI
			draggableItems={allOrderedEntities}
			droppableId={ticketDroppableId}
			entityType={TypeName.tickets}
			id='tickets-list-sort-by-control'
			label={labels.sortBy}
			onChangeValue={setSortBy}
			options={options}
			onSort={sortResponder}
			onSubmit={updateEntityList}
			renderDraggableItems={renderDraggableItems}
			value={sortBy}
		/>
	);
};

export default SortByControl;
