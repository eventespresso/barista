import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { MutationType, MutationInput } from '@eventespresso/data';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@eventespresso/constants';
import { removeNullAndUndefined, ucFirst } from '@eventespresso/utils';

import type { Ticket } from '../../';
import { useLazyTicket } from '../../queries';

export const TICKET_DEFAULTS: Ticket = {
	id: '',
	dbId: 0,
	cacheId: '',
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
	const getTicket = useLazyTicket();

	return useCallback<OptimisticResCb>(
		(mutationType, input) => {
			let espressoTicket: Partial<Ticket> = {
				__typename: 'EspressoTicket',
			};
			// Get rid of null or undefined values
			const filteredInput = removeNullAndUndefined(input);
			const ticket = getTicket(input.id);

			switch (mutationType) {
				case MutationType.Create:
					espressoTicket = {
						...espressoTicket,
						...TICKET_DEFAULTS,
						// make sure the id is generated on each call to make sure
						// it is unique for each entity created in bulk
						id: `temp:${uuidv4()}`,
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
		[getTicket]
	);
};

export default useOptimisticResponse;
