import { EditDateRangeButtonProps as EditDateRangeButtonUIProps } from '@eventespresso/ui-components';

export interface EditDateButtonProps extends Omit<EditDateRangeButtonUIProps, 'startDate' | 'endDate'> {
	endDate: string; // ISO string
	startDate: string; // ISO string
}
