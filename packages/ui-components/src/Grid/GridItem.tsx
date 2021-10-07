import classNames from 'classnames';

import type { GridItemProps } from './types';

export const GridItem: React.FC<GridItemProps> = ({ children, colSpan, rowSpan, ...props }) => {
	const className = classNames(
		'ee-grid__item',
		colSpan && `ee-grid__item--col-span-${colSpan}`,
		rowSpan && `ee-grid__item--row-span-${rowSpan}`,
		props.className
	);

	return <div className={className}>{children}</div>;
};
