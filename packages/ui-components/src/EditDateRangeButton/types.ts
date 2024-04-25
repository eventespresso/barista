import { DateTimeRangePickerProps } from '../DateTimeRangePicker';

import type { PopoverProps } from '@eventespresso/adapters';
import type { DateRange } from '@eventespresso/dates';
import type { LabelPosition } from '../withLabel';
import type { ButtonProps } from '../Button';
import type { StartAndEndDate } from '@eventespresso/types';

export interface EditDateRangeButtonProps
	extends Omit<ButtonProps, 'onChange'>,
		Pick<DateTimeRangePickerProps, 'TimezoneTimeInfo'>,
		StartAndEndDate.Type.DateObject {
	dateTimeFormat?: string;
	header?: string;
	locale?: string;
	onChange: (dates: DateRange) => void;
	popoverPlacement?: PopoverProps['placement'];
	tooltip?: string;
	tooltipPosition?: LabelPosition;
}
