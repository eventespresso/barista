import type { GridProps as GridAdapterProps } from '@eventespresso/adapters';
import type { Size } from '../../';

export interface GridProps extends GridAdapterProps, Size {
	className?: string;
	maxColumns?: number;
}
export interface GridItemProps extends Size {
	className?: string;
	id?: string;
}

export interface GridCardProps extends GridItemProps {
	header?: string;
}
