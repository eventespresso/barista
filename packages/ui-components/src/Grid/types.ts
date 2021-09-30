import type { Size } from '../../';

export interface GridItemProps extends Size {
	children: JSX.Element;
	className?: string;
	id?: string;
}

export interface GridCardProps extends GridItemProps {
	children: JSX.Element;
	header?: string;
}
