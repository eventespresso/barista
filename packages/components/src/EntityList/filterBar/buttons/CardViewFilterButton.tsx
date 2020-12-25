import React from 'react';
import { __ } from '@eventespresso/i18n';

import { AppstoreFilled } from '@eventespresso/icons';

import { Button } from '../../../Button';
import type { CardViewFilterButtonProps } from '../types';

export const CardViewFilterButton: React.FC<CardViewFilterButtonProps> = ({ id, onClick, view, ...rest }) => {
	const filterId = `ee-card-view-btn-${id}`;

	return (
		<Button
			active={view === 'card'}
			className='ee-filter-bar__btn'
			icon={AppstoreFilled}
			id={filterId}
			onClick={view !== 'card' ? onClick : null}
			labelClassName={'ee-filter-bar__btn-wrap'}
			{...rest}
		>
			{__('card view')}
		</Button>
	);
};
