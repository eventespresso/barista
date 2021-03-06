import { CREATE_DATETIME, UPDATE_DATETIME, DELETE_DATETIME } from './datetimes';
import { UPDATE_EVENT } from './events';
import { CREATE_TICKET, UPDATE_TICKET, DELETE_TICKET } from './tickets';
import { CREATE_PRICE, UPDATE_PRICE, DELETE_PRICE } from './prices';

export const mutations: any = {
	/* datetimes */
	CREATE_DATETIME,
	UPDATE_DATETIME,
	DELETE_DATETIME,
	/* events */
	UPDATE_EVENT,
	/* tickets */
	CREATE_TICKET,
	UPDATE_TICKET,
	DELETE_TICKET,
	/* prices */
	CREATE_PRICE,
	UPDATE_PRICE,
	DELETE_PRICE,
};

export * from './datetimes';
export * from './events';
export * from './tickets';
export * from './prices';

export * from './utils';
export * from './types';

export { default as useUpdateCallback } from './useUpdateCallback';
