import type { EntityListItemProps } from '@eventespresso/components';
import type { EntityListViewProps } from '@eventespresso/ee-components';
import type { Datetime, DatetimesFilterStateManager } from '@eventespresso/edtr-services';

export interface DatesListViewProps extends EntityListViewProps<DatetimesFilterStateManager> {}

export interface DateItemProps extends EntityListItemProps<Datetime> {
	adminUrl?: string;
	eventId?: number;
}
