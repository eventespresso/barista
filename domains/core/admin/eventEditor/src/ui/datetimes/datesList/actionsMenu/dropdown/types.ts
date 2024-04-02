import type { Datetime } from '@eventespresso/constants';

export interface DateMainMenuProps {
	copyDate?: VoidFunction;
	datetime?: Datetime;
	editDate?: VoidFunction;
	onClick?: VoidFunction;
	trashed?: boolean;
}
