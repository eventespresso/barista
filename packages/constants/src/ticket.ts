import { __ } from '@eventespresso/i18n';

export const TICKETS_DROPPABLE_ID = 'ticket-entities-droppable';

export const TICKET_STATUS_LABELS = {
	CLOSED: __('Closed'),
	EXPIRED: __('Expired'),
	ON_SALE: __('On Sale'),
	PENDING: __('Pending'),
	SOLD_OUT: __('Sold Out'),
	TRASHED: __('Trashed'),
};

export const TICKET_STATUS_CODES = {
	CLOSED: 'TKC',
	EXPIRED: 'TKE',
	ON_SALE: 'TKO',
	PENDING: 'TKP',
	SOLD_OUT: 'TKS',
	TRASHED: 'TKA',
};

export const TICKET_STATUSES = {
	CLOSED: 'CLOSED',
	EXPIRED: 'EXPIRED',
	ON_SALE: 'ON_SALE',
	PENDING: 'PENDING',
	SOLD_OUT: 'SOLD_OUT',
	TRASHED: 'TRASHED',
};
