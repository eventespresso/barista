import type { InlineEditCurrencyProps, EntityListItemProps } from '@eventespresso/ui-components';
import type { EntityListViewProps } from '@eventespresso/ee-components';
import type { EntityId } from '@eventespresso/data';
import type { Ticket, TicketsFilterStateManager } from '@eventespresso/edtr-services';

export interface TicketsListViewProps extends EntityListViewProps<TicketsFilterStateManager> {}

export interface TicketItemProps extends EntityListItemProps<Ticket> {}

export interface EditablePriceProps extends InlineEditCurrencyProps {
	className?: string;
	id: EntityId;
	price: number;
}
