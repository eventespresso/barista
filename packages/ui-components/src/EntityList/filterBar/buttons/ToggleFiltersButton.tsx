import { __ } from '@eventespresso/i18n';
import { Filter } from '@eventespresso/icons';
import { Button } from '../../../Button';

import type { ToggleFiltersButtonProps } from '../types';

export const ToggleFiltersButton: React.FC<ToggleFiltersButtonProps> = ({ id, onClick, value, ...rest }) => {
	const filterId = `ee-toggle-filters-btn-${id}`;
	const tooltip = value ? __('hide filters') : __('show filters');

	return (
		<Button
			active={value}
			className='ee-filter-bar__btn'
			icon={Filter}
			id={filterId}
			labelClassName={'ee-filter-bar__btn-wrap'}
			onClick={onClick}
			size='small'
			{...rest}
		>
			{tooltip}
		</Button>
	);
};
