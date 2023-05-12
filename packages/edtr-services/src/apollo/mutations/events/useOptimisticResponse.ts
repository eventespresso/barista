import { useCallback } from 'react';

import { MutationType, MutationInput } from '@eventespresso/data';
import { ucFirst, removeNullAndUndefined, uuid } from '@eventespresso/utils';

import type { Event } from '../../types';
import { useEvent } from '../../queries';

export const EVENT_DEFAULTS: Event = {
	id: '',
	dbId: 0,
	cacheId: uuid(),
	allowDonations: false,
	allowOverflow: false,
	altRegPage: '',
	created: '',
	description: '',
	defaultRegStatus: '',
	displayDescription: false,
	displayTicketSelector: true,
	isActive: true,
	isCancelled: false,
	isExpired: false,
	isInactive: false,
	isPostponed: false,
	isSoldOut: false,
	isUpcoming: false,
	maxRegistrations: 0,
	memberOnly: false,
	name: '',
	order: 0,
	phoneNumber: '',
	shortDescription: '',
	status: '',
	timezoneString: '',
	venue: '',
};

type OptimisticResCb = (mutationType: MutationType, input: MutationInput) => any;

const useOptimisticResponse = (): OptimisticResCb => {
	const event = useEvent();

	return useCallback<OptimisticResCb>(
		(mutationType, input) => {
			let espressoEvent: Partial<Event> = {
				__typename: 'EspressoEvent',
			};
			// Get rid of null or undefined values
			const filteredInput = removeNullAndUndefined(input);

			switch (mutationType) {
				case MutationType.Update:
					espressoEvent = {
						...espressoEvent,
						...event,
						...filteredInput,
						cacheId: uuid(),
					};
					// if manager is being updated
					if (input?.manager) {
						// make sure to properly update manager object
						espressoEvent.manager = {
							...event?.manager,
							id: input?.manager,
						};
					}
					break;
			}

			const lcMutationtype = mutationType.toLowerCase();
			const ucFirstMutationtype = ucFirst(lcMutationtype);

			// e.g. "updateEspressoEvent"
			const mutation = `${lcMutationtype}EspressoEvent`;

			return {
				__typename: 'RootMutation',
				[mutation]: {
					__typename: `${ucFirstMutationtype}EspressoEventPayload`,
					espressoEvent,
				},
			};
		},
		[event]
	);
};

export default useOptimisticResponse;
