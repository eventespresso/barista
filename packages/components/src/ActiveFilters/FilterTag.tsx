import React from 'react';
import classNames from 'classnames';
import { Close } from '@eventespresso/icons';
import { FilterTagProps } from './types';

const FilterTag: React.FC<FilterTagProps> = ({ title, className, onRemove }) => {
	return (
		<div className={classNames('ee-filter-tag', className)}>
			{title}
			<button className='ee-filter-tag__close-btn' onClick={onRemove}>
				<Close aria-label='remove filters' size={'tiny'} />
			</button>
		</div>
	);
};

export default FilterTag;
