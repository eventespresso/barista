import classNames from 'classnames';

import { Heading } from '../Heading';
import { GridItem } from './GridItem';
import type { GridCardProps } from './types';

export const GridCard: React.FC<GridCardProps> = ({ children, size, header, ...props }) => {
	const className = classNames('ee-grid-card', size && `ee-grid__item--size-${size}`, props.className);

	return (
		<div>
			{header && (
				<Heading as='h3' className='ee-grid-card__heading'>
					{header}
				</Heading>
			)}
			<GridItem size={size} className={className}>
				<>{children}</>
			</GridItem>
		</div>
	);
};
