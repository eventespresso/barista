import { useCallback, useEffect } from 'react';

import { __ } from '@eventespresso/i18n';
import { TypeName } from '@eventespresso/services';
import {
	domain,
	datesList,
	DatetimesListProvider,
	withEntityListContext,
	useDatesListFilterState,
} from '@eventespresso/edtr-services';
import { EntityList } from '@eventespresso/ee-components';

import DatesListFooter from './DatesListFooter';
import { legendConfig } from './config';
import { RenderCardView } from './cardView';
import { RenderTableView } from './tableView';
import { ActiveDatesFilters } from './filterBar';
import { hideAllExcept } from '../../utils';

const DatesList: React.FC = () => {
	useEffect(() => hideAllExcept([]), []);
	const filterState = useDatesListFilterState();

	const renderList = useCallback(
		() => (filterState.view === 'card' ? <RenderCardView /> : <RenderTableView />),
		[filterState.view]
	);

	return (
		<EntityList
			activeFilters={<ActiveDatesFilters />}
			domain={domain}
			entityType={TypeName.datetimes}
			filterState={filterState}
			footer={<DatesListFooter />}
			headerText={__('Event Dates')}
			legendConfig={legendConfig}
			listId={datesList}
			loadingText={__('loading event dates…')}
			renderList={renderList}
		/>
	);
};

export default withEntityListContext({
	Provider: DatetimesListProvider,
	Component: DatesList,
});
