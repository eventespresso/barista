import { useMemo } from 'react';

import { useMemoStringify } from '@eventespresso/utils';
import { EntityTable as EntityTableUI, RowType, BodyRow, HeaderRow } from '@eventespresso/ui-components';
import type { EntityListFilterStateManager } from '@eventespresso/services';

import useEntityTableFilters from './useEntityTableFilters';
import type { EntityTableProps } from './types';

type ELFSM = EntityListFilterStateManager<any>;

const EntityTable = <FS extends ELFSM>({
	bodyRowGenerator,
	className,
	domain,
	entityIds,
	filterState,
	headerRowGenerator,
	listId,
	tableCaption,
	tableId,
}: Partial<EntityTableProps<FS>>): JSX.Element => {
	const { applyFilters } = useEntityTableFilters(domain, listId);

	const bodyRows = useMemo(() => {
		return entityIds?.map((entityId) => {
			const bodyRow = bodyRowGenerator({ entityId, filterState });

			return applyFilters(bodyRow, filterState, RowType.body, entityId) as BodyRow;
		});
	}, [applyFilters, bodyRowGenerator, entityIds, filterState]);

	const headerRows = useMemo(() => {
		const headerRow = headerRowGenerator(filterState);

		const filteredHeaderRow = applyFilters(headerRow, filterState, RowType.header) as HeaderRow;
		return [filteredHeaderRow];
	}, [applyFilters, filterState, headerRowGenerator]);

	const metaData = useMemoStringify({
		tableId,
		tableCaption,
	});

	// key to make sure the list is refreshed after optimistic responses
	const key = entityIds?.join(':');

	return (
		<EntityTableUI
			bodyRows={bodyRows}
			className={className}
			headerRows={headerRows}
			key={key}
			metaData={metaData}
		/>
	);
};

export default EntityTable;
