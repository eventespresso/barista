import { __ } from '@eventespresso/i18n';
import { useFeature, useStatus } from '@eventespresso/services';
import { Slot } from '@eventespresso/slot-fill';
import { CollapsibleLegend, EmptyState, Pagination, EntityList as EntityListUI } from '@eventespresso/ui-components';
import type { EntityListFilterStateManager } from '@eventespresso/services';

import EntityListFilterBar from './withValidFilterState';
import type { EntityListProps } from './types';

const EntityList = <ELFS extends EntityListFilterStateManager<any>>({
	activeFilters,
	domain,
	entityType,
	filterState,
	footer,
	headerText,
	legendConfig,
	listId,
	noResultsDesc,
	noResultsTitle,
	renderList,
}: EntityListProps<ELFS>): JSX.Element => {
	const { isError, isLoading } = useStatus();
	const error = isError(entityType);
	const loading = isLoading(entityType);
	const showBulkActions = useFeature('ee_event_editor_bulk_edit');

	let entityList: React.ReactNode;

	if (filterState.total === 0) {
		const title = noResultsTitle ? noResultsTitle : __('no results found');
		const description = noResultsDesc ? noResultsDesc : __('try changing filter settings');
		entityList = <EmptyState description={description} title={title} />;
	} else {
		entityList = renderList();
	}

	const filterBar = (
		<EntityListFilterBar
			domain={domain}
			filterState={filterState}
			listId={listId}
			showBulkActionsToggle={showBulkActions}
		/>
	);

	const legend = <CollapsibleLegend direction='row' legendConfig={legendConfig} termWhiteBg />;

	const pagination = (
		<Pagination
			className='ee-entity-list__pagination'
			defaultPerPage={6}
			onChangePageNumber={filterState.setPageNumber}
			onChangePerPage={filterState.setPerPage}
			pageNumber={filterState.pageNumber}
			perPage={filterState.perPage}
			showPerPageChanger
			total={filterState.total}
		/>
	);

	const afterHeading = <Slot name={`before-${entityType}-list`} />;
	const afterList = <Slot name={`after-${entityType}-list`} />;

	return (
		<EntityListUI
			activeFilters={activeFilters}
			afterHeading={afterHeading}
			afterList={afterList}
			entityList={entityList}
			error={error}
			filterBar={filterBar}
			footer={footer}
			headerText={headerText}
			id={`ee-entity-list-${entityType}`}
			legend={legend}
			loading={loading}
			pagination={pagination}
		/>
	);
};

export default EntityList;
