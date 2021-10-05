import classNames from 'classnames';

import { Grid as GridAdapter } from '@eventespresso/adapters';
import type { GridProps } from './types';

import './style.scss';

export const Grid: React.FC<GridProps> = ({ maxColumns, size, ...props }) => {
	const className = classNames(
		'ee-grid',
		maxColumns && `ee-grid--max-cols-${maxColumns}`,
		size && `ee-grid--size-${size}`,
		props.className
	);

	return <GridAdapter {...props} className={className} />;
};
