import { EditDateRangeButtonProps as EditDateRangeButtonUIProps } from '@eventespresso/ui-components';

// TODO: investigate this type and re-use instead of duplicating it
export interface EditDateButtonProps extends Omit<EditDateRangeButtonUIProps, 'startDate' | 'endDate'> {
	endDate: string; // ISO string
	startDate: string; // ISO string
}
