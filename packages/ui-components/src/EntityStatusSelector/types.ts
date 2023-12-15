import type { InlineEditProps, PopoverProps } from '@eventespresso/adapters';
import type { LabelPosition } from '../withLabel';

export interface EntityStatusSelectProps {
	id: string;
	currentStatus: string;
	className?: string;
	entityType: string;
	footerText?: React.ReactNode | string;
	headerText?: string;
	helpText?: React.ReactNode;
	onStatusChange: InlineEditProps['onChange'];
	options: Array<{ [key: string]: string }>;
	popoverPlacement?: PopoverProps['placement'];
	tooltip?: string;
	tooltipPosition?: LabelPosition;
}
