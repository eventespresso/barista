import type { GridProps } from './types';

export const Grid: React.FC<GridProps> = ({ children, className, columns, spacing }) => {
	return (
		<div className={className}>
			{children}
		</div>
	);
};
