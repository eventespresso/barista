import { __ } from '@eventespresso/i18n';
import { TableView } from '@eventespresso/icons';

import { Button } from '../../../Button';
import type { TableViewFilterButtonProps } from '../types';

export const TableViewFilterButton: React.FC<TableViewFilterButtonProps> = ({ id, onClick, view, ...rest }) => {
	const filterId = `ee-table-view-btn-${id}`;

	return (
		<Button
			{...rest}
			active={view === 'table'}
			className='ee-filter-bar__btn'
			icon={TableView}
			id={filterId}
			onClick={view !== 'table' ? onClick : null}
			labelClassName={'ee-filter-bar__btn-wrap'}
			size='small'
		>
			{__('table view')}
		</Button>
	);
};
