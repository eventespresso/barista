import { useCallback } from 'react';
import { useApolloClient } from '@eventespresso/data';
import { v4 as uuidv4 } from 'uuid';

import { GET_TICKET } from '../../';
import { MutationType, MutationInput } from '@eventespresso/data';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@eventespresso/constants';
import { Ticket, TicketItem } from '../../';
import { removeNullAndUndefined, ucFirst } from '@eventespresso/services';

export const TICKET_DEFAULTS: Ticket = {
	id: '',
	dbId: 0,
	cacheId: uuidv4(),
	description: '',
	endDate: PLUS_TWO_MONTHS.toISOString(),
	isSoldOut: false,
	isTrashed: false,
	isDefault: false,
	isExpired: false,
	isFree: false,
	isOnSale: false,
	isPending: true,
	isRequired: false,
	isTaxable: false,
	max: -1,
	min: 0,
	name: '',
	order: 0,
	price: null,
	prices: null,
	quantity: -1,
	registrationCount: 0,
	reserved: 0,
	reverseCalculate: true,
	sold: 0,
	startDate: PLUS_ONE_MONTH.toISOString(),
	uses: -1,
};

type OptimisticResCb = (mutationType: MutationType, input: MutationInput) => any;

const useOptimisticResponse = (): OptimisticResCb => {
	const client = useApolloClient();

	return useCallback<OptimisticResCb>(
		(mutationType, input) => {
			let espressoTicket: Partial<Ticket> = {
				__typename: 'EspressoTicket',
			};
			// Get rid of null or undefined values
			const filteredInput = removeNullAndUndefined(input);
			let data: TicketItem;
			try {
				data = client.readQuery<TicketItem>({
					query: GET_TICKET,
					variables: {
						id: input.id,
					},
				});
			} catch (error) {
				// do nothing
			}
			const ticket = data?.ticket;

			switch (mutationType) {
				case MutationType.Create:
					espressoTicket = {
						...espressoTicket,
						...TICKET_DEFAULTS,
						...filteredInput,
						prices: null,
					};
					break;
				case MutationType.Delete:
					espressoTicket = {
						...espressoTicket,
						...TICKET_DEFAULTS, // to avoid pollution of test console
						...ticket,
						...filteredInput,
						isTrashed: true,
						cacheId: uuidv4(),
					};
					break;
				case MutationType.Update:
					espressoTicket = {
						...espressoTicket,
						...ticket,
						...filteredInput,
						cacheId: uuidv4(),
						prices: null,
					};
					break;
			}

			const lcMutationtype = mutationType.toLowerCase();
			const ucFirstMutationtype = ucFirst(lcMutationtype);

			// e.g. "deleteEspressoTicket", "createEspressoTicket"
			const mutation = `${lcMutationtype}EspressoTicket`;

			return {
				__typename: 'RootMutation',
				[mutation]: {
					__typename: `${ucFirstMutationtype}EspressoTicketPayload`,
					espressoTicket,
				},
			};
		},
		[client]
	);
};

export default useOptimisticResponse;
