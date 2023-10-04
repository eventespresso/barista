import { __ } from '@eventespresso/i18n';
import { Filter } from '@eventespresso/icons';
import { Button, ButtonType } from '../../../Button';

import type { ToggleFiltersButtonProps } from '../types';

export const ToggleFiltersButton: React.FC<ToggleFiltersButtonProps> = ({ id, onClick, value, ...rest }) => {
	const filterId = `ee-toggle-filters-btn-${id}`;
	const buttonType = value ? ButtonType.PRIMARY : ButtonType.DEFAULT;

	return (
		<Button
			active={value}
			buttonType={buttonType}
			className='ee-filter-bar__btn'
			icon={Filter}
			id={filterId}
			labelClassName={'ee-filter-bar__btn-wrap'}
			onClick={onClick}
			size='small'
			{...rest}
		>
			{__('filters')}
		</Button>
	);
};
