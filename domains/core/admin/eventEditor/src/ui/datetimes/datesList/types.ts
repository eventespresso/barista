import type { EntityListItemProps } from '@eventespresso/ui-components';
import type { EntityListViewProps } from '@eventespresso/ee-components';
import type { Datetime } from '@eventespresso/constants';
import type { DatetimesFilterStateManager } from '@eventespresso/edtr-services';

export interface DatesListViewProps extends EntityListViewProps<DatetimesFilterStateManager> {}

export interface DateItemProps extends EntityListItemProps<Datetime> {}
