import { useCallback } from 'react';

import { MutationType, MutationInput } from '@eventespresso/data';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@eventespresso/constants';
import { ucFirst, uuid } from '@eventespresso/utils';
import type { Datetime } from '../../types';
import { useLazyDatetime } from '../../queries';

export const DATETIME_DEFAULTS: Datetime = {
	id: '',
	dbId: 0,
	cacheId: '',
	capacity: -1,
	description: '',
	endDate: PLUS_TWO_MONTHS.toISOString(),
	isActive: false,
	isExpired: false,
	isPrimary: false,
	isSoldOut: false,
	isTrashed: false,
	isUpcoming: false,
	length: 0,
	name: '',
	order: 0,
	reserved: 0,
	sold: 0,
	startDate: PLUS_ONE_MONTH.toISOString(),
	status: null,
	venue: '',
};

type OptimisticResCb = (mutationType: MutationType, input: MutationInput) => any;

const useOptimisticResponse = (): OptimisticResCb => {
	const getDatetime = useLazyDatetime();

	return useCallback<OptimisticResCb>(
		(mutationType, input) => {
			let espressoDatetime: Partial<Datetime> = {
				__typename: 'EspressoDatetime',
			};

			const datetime = getDatetime(input.id);
			const cacheId = `temp:${uuid()}`;

			switch (mutationType) {
				case MutationType.Create:
					espressoDatetime = {
						...espressoDatetime,
						...DATETIME_DEFAULTS,
						cacheId,
						// make sure the id is generated on each call to make sure
						// it is unique for each entity created in bulk
						id: cacheId,
						...input,
					};
					break;
				case MutationType.Delete:
					espressoDatetime = {
						...espressoDatetime,
						...DATETIME_DEFAULTS, // to avoid pollution of test console
						...datetime,
						...input,
						isTrashed: true,
						cacheId,
					};
					break;
				case MutationType.Update:
					espressoDatetime = {
						...espressoDatetime,
						...datetime,
						...input,
						cacheId,
					};
					break;
			}

			const lcMutationtype = mutationType.toLowerCase();
			const ucFirstMutationtype = ucFirst(lcMutationtype);

			// e.g. "deleteEspressoDatetime", "createEspressoDatetime"
			const mutation = `${lcMutationtype}EspressoDatetime`;

			return {
				__typename: 'RootMutation',
				[mutation]: {
					__typename: `${ucFirstMutationtype}EspressoDatetimePayload`,
					espressoDatetime,
				},
			};
		},
		[getDatetime]
	);
};

export default useOptimisticResponse;
