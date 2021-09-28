import type { Size } from '../../';

export interface GridItemProps extends Size {
	children: JSX.Element;
	className?: string;
	id?: string;
	label?: string;
}
