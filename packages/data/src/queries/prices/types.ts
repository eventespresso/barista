import type { EntityQueryArgs } from '../types';
import type { EntityEdge } from '../../types';

// LATER: consolidate data types
export interface PricesQueryWhereArgs {
	event?: string;
	eventId?: number;
	includeDefaultPrices?: boolean;
	includeDefaultTicketsPrices?: boolean;
	isDefault?: boolean;
}

export type PricesQueryArgs = EntityQueryArgs<PricesQueryWhereArgs>;

export interface PricesList<Edge extends EntityEdge> {
	espressoPrices: Edge;
}
