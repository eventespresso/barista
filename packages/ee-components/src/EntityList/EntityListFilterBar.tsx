import { __ } from '@eventespresso/i18n';
import { useFilterBarUIElements } from '@eventespresso/registry';
import {
	SearchInputWithLabel,
	EntityListFilterBar as EntityListFilterBarUI,
	EntityListViewButtonGroup,
} from '@eventespresso/ui-components';

import type { EntityListFilterStateManager as ELFSM } from '@eventespresso/services';
import type { EntityListFilterBarProps } from './types';

/**
 * EntityListFilterBar
 * a group of inputs for controlling how a list of entities is displayed
 */
export const EntityListFilterBar = <FS extends ELFSM>({
	domain,
	filterState,
	listId,
}: EntityListFilterBarProps<FS>): JSX.Element => {
	const { searchText, setCardView, setSearchText, setTableView, view } = filterState;

	const filerBarItems = useFilterBarUIElements({ domain, filterState, listId });

	const searchId = `ee-search-input-${listId}`;

	const mainButtons = (
		<EntityListViewButtonGroup id={listId} setCardView={setCardView} setTableView={setTableView} view={view} />
	);

	const collapsibleButtons = (
		<>
			{filerBarItems}
			<div className='ee-filter-bar__filter'>
				<SearchInputWithLabel
					className='ee-entity-list-filter-bar-search'
					id={searchId}
					label={__('search')}
					searchText={searchText}
					setSearchText={setSearchText}
				/>
			</div>
		</>
	);

	return <EntityListFilterBarUI collapsibleButtons={collapsibleButtons} id={listId} mainButtons={mainButtons} />;
};
