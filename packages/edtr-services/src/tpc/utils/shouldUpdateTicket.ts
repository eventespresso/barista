import { pick } from 'ramda';

import { EntityId } from '@eventespresso/data';
import { RelationsManager } from '@eventespresso/services';
import { Ticket, TICKET_FIELDS_FOR_TPC } from '../../';

interface ShouldUpdateTicketProps {
	existingTicket: Ticket;
	getRelations: RelationsManager['getRelations'];
	newTicket: Partial<Ticket>;
	relatedPriceIds: Array<EntityId>;
}

/**
 * Returns boolean to check whether we really need to update the ticket or not
 */
const shouldUpdateTicket = ({
	existingTicket,
	getRelations,
	newTicket,
	relatedPriceIds,
}: ShouldUpdateTicketProps): boolean => {
	// if we are very unlucky
	if (!existingTicket) {
		return true;
	}

	const existingRelatedPriceIds = getRelations({
		entity: 'tickets',
		entityId: newTicket.id,
		relation: 'prices',
	});

	const sortedExistingRelatedPriceIdsJson = JSON.stringify(existingRelatedPriceIds.sort());
	const sortedRelatedPriceIdsJson = JSON.stringify(relatedPriceIds.sort());

	// if price relations for the ticket have changed
	if (sortedExistingRelatedPriceIdsJson !== sortedRelatedPriceIdsJson) {
		return true;
	}

	const existingTicketJson = JSON.stringify(pick(TICKET_FIELDS_FOR_TPC, existingTicket));
	const newTicketJson = JSON.stringify(newTicket);

	// if ticket fields have changed
	if (existingTicketJson !== newTicketJson) {
		return true;
	}

	return false;
};

export default shouldUpdateTicket;
