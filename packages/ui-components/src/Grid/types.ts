import type { GridProps as GridAdapterProps } from '@eventespresso/adapters';

export interface GridProps extends GridAdapterProps {
	className?: string;
	maxColumns?: number;
	size?: 'smaller' | 'small' | 'default' | 'big' | 'bigger';
}

export interface GridItemProps {
	className?: string;
	colSpan?: number;
	id?: string;
	rowSpan?: number;
}

export interface GridCardProps extends GridItemProps {
	header?: string;
}
