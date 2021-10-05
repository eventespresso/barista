import classNames from 'classnames';

import { Heading } from '../Heading';
import { GridItem } from './GridItem';
import type { GridCardProps } from './types';

export const GridCard: React.FC<GridCardProps> = ({ children, header, ...props }) => {
	const className = classNames('ee-grid-card__wrapper', props.className);

	return (
		<GridItem {...props} className={className}>
			{header && (
				<Heading as='h3' className='ee-grid-card__heading'>
					{header}
				</Heading>
			)}
			<div className='ee-grid-card'>{children}</div>
		</GridItem>
	);
};
