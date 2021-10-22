import { useCallback } from 'react';

import { MutationType, MutationInput } from '@eventespresso/data';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@eventespresso/constants';
import { ucFirst, uuid } from '@eventespresso/utils';

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
	userId: '',
	uses: -1,
	visibility: 'PUBLIC',
};

type OptimisticResCb = (mutationType: MutationType, input: MutationInput) => any;

const useOptimisticResponse = (): OptimisticResCb => {
	const getTicket = useLazyTicket();

	return useCallback<OptimisticResCb>(
		(mutationType, input) => {
			let espressoTicket: Partial<Ticket> = {
				__typename: 'EspressoTicket',
			};
			const ticket = getTicket(input.id);
			const cacheId = `temp:${uuid()}`;

			switch (mutationType) {
				case MutationType.Create:
					espressoTicket = {
						...espressoTicket,
						...TICKET_DEFAULTS,
						cacheId,
						// make sure the id is generated on each call to make sure
						// it is unique for each entity created in bulk
						id: cacheId,
						...input,
						prices: null,
					};
					break;
				case MutationType.Delete:
					espressoTicket = {
						...espressoTicket,
						...TICKET_DEFAULTS, // to avoid pollution of test console
						...ticket,
						...input,
						isTrashed: true,
						cacheId,
					};
					break;
				case MutationType.Update:
					espressoTicket = {
						...espressoTicket,
						...ticket,
						...input,
						cacheId,
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
