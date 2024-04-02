import { useCallback } from 'react';

import { normalizeNumericFields, removeNullAndUndefined } from '@eventespresso/utils';
import { MutationType } from '@eventespresso/data';

import useMutationVariables from './useMutationVariables';
import useOnCreateDatetime from './useOnCreateDatetime';
import useOnDeleteDatetime from './useOnDeleteDatetime';
import useOnUpdateDatetime from './useOnUpdateDatetime';
import useOptimisticResponse from './useOptimisticResponse';
import { DEFAULT_DATETIME_LIST_DATA as DEFAULT_LIST_DATA } from '../../queries';
import type { Datetime } from '@eventespresso/constants';
import type { DatetimesList } from '../../types';
import type { MutationHandler, MutationUpdater } from '../types';
import { useDatetimeQueryOptions } from '../../queries/datetimes';
import type { DatetimeCommonInput } from './types';
import { NUMERIC_FIELDS } from './constants';

type MH = MutationHandler<Datetime, DatetimeCommonInput>;

const useMutationHandler = (): MH => {
	const options = useDatetimeQueryOptions();

	const onCreateDatetime = useOnCreateDatetime();
	const onUpdateDatetime = useOnUpdateDatetime();
	const onDeleteDatetime = useOnDeleteDatetime();

	const getMutationVariables = useMutationVariables();
	const getOptimisticResponse = useOptimisticResponse();

	const onUpdate = useCallback<MutationUpdater<Datetime, DatetimeCommonInput>>(
		({ cache, entity: datetime, input, mutationType }) => {
			// Read the existing data from cache.
			let data: DatetimesList;
			try {
				data = cache.readQuery(options);
			} catch (error) {
				data = null;
			}
			const datetimes = data?.espressoDatetimes || DEFAULT_LIST_DATA;
			const tickets = input?.tickets;

			switch (mutationType) {
				case MutationType.Create:
					onCreateDatetime({ cache, datetimes, datetime, tickets });
					break;
				case MutationType.Update:
					onUpdateDatetime({ datetime, tickets });
					break;
				case MutationType.Delete:
					onDeleteDatetime({ cache, datetimes, datetime, deletePermanently: input?.deletePermanently });
					break;
			}
		},
		[onCreateDatetime, onDeleteDatetime, onUpdateDatetime, options]
	);

	const mutationHandler = useCallback<MH>(
		(mutationType, input) => {
			// Get rid of null or undefined values
			const filteredInput = removeNullAndUndefined(input);
			// normalize numeric fields
			const normalizedInput = normalizeNumericFields(NUMERIC_FIELDS, filteredInput);

			const variables = getMutationVariables(mutationType, normalizedInput);
			const optimisticResponse = getOptimisticResponse(mutationType, normalizedInput);

			return { variables, optimisticResponse, onUpdate };
		},
		[getMutationVariables, getOptimisticResponse, onUpdate]
	);

	return mutationHandler;
};

export default useMutationHandler;
