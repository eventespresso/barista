import { pickBy } from 'ramda';
import { isTicketField } from './selectionPredicates';
import { Ticket } from '@eventespresso/edtr-services';

export const copyTicketFields = <T = Ticket>(ticket: T, predicate = isTicketField): T =>
	pickBy<T, T>(predicate, ticket);
