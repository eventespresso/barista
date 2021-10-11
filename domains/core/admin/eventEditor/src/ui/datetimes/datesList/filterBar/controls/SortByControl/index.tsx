import { SortByControl as SortByControlUI } from '@eventespresso/ee-components';
import type { SortByControlProps } from '@eventespresso/ee-components';
import {
	useDatesListFilterState,
	useFilteredDateIds,
	useReorderDatetimes,
	Datetime,
} from '@eventespresso/edtr-services';
import { objectToSelectOptions } from '@eventespresso/utils';
import { datetimesDroppableId } from '@eventespresso/constants';
import { TypeName } from '@eventespresso/services';

import { labels, sortByOptions } from '../options';
import DraggableDatetime from './DraggableDatetime';

const options = objectToSelectOptions(sortByOptions);

const renderDraggableItem: SortByControlProps<Datetime>['renderDraggableItem'] = (datetime) => ({
	...datetime,
	content: <DraggableDatetime {...datetime} />,
});

const SortByControl: React.FC = () => {
	const { sortBy, setSortBy } = useDatesListFilterState();
	const filteredDateIds = useFilteredDateIds();
	const {
		allReorderedEntities: draggableItems,
		sortResponder,
		updateEntityList,
	} = useReorderDatetimes(filteredDateIds);

	return (
		<SortByControlUI
			draggableItems={draggableItems}
			droppableId={datetimesDroppableId}
			entityType={TypeName.datetimes}
			id='ee-dates-list-sort-by-control'
			label={labels.sortBy}
			renderDraggableItem={renderDraggableItem}
			onChangeValue={setSortBy}
			onSort={sortResponder}
			onSubmit={updateEntityList}
			options={options}
			value={sortBy}
		/>
	);
};

export default SortByControl;
