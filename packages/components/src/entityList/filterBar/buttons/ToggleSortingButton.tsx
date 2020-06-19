import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from '../../../Button';
import { Sort } from '@eventespresso/components';
import { ToggleSortingButtonProps } from '../types';

import { getPropsAreEqual } from '@eventespresso/services';

const ToggleSortingButton: React.FC<ToggleSortingButtonProps> = ({
	listId,
	sortingEnabled,
	toggleSorting,
	...rest
}) => {
	const id = `ee-toggle-sorting-btn-${listId}`;

	return (
		<Button
			active={sortingEnabled}
			className='ee-filter-bar__btn ee-btn--small'
			icon={Sort}
			id={id}
			onClick={toggleSorting}
			labelClassName='ee-filter-bar__btn-wrap'
			{...rest}
		>
			{sortingEnabled ? __('disable sorting') : __('enable sorting')}
		</Button>
	);
};

export default React.memo(ToggleSortingButton, getPropsAreEqual(['listId'], ['sortingEnabled']));
