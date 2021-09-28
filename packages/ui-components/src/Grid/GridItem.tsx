import classNames from 'classnames';

import type { GridItemProps } from './types';

export const GridItem: React.FC<GridItemProps> = ({ children, id, label, size, ...props }) => {
	const className = classNames('ee-grid__item', size && `ee-grid__item--size-${size}`, props.className);

	return (
		<div className={className}>
			{label && <label className='ee-grid__item-label' id={id}>
				{label}
			</label>}
			{children}
		</div>
	);
};
