import type { StartAndEndDate } from '@eventespresso/types';
import type { EditDateRangeButtonProps as EditDateRangeButtonUIProps } from '@eventespresso/ui-components';

export interface EditDateButtonProps
	extends Omit<EditDateRangeButtonUIProps, 'startDate' | 'endDate'>,
		StartAndEndDate.Type.String {}
