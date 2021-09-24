import { includes, ObjPred } from 'ramda';

import { idToPropMap, parseInfinity, isInfinite } from '@eventespresso/utils';
import type { EntityId } from '@eventespresso/data';
import type { Datetime } from '@eventespresso/edtr-services';

import { DATETIME_FIELDS, DATETIME_INPUT_FIELDS } from './datetimeFields';
import { getGuids } from '../common';

export const isDatetimeField: ObjPred = (value, field) => includes(field, DATETIME_FIELDS);

export const isDatetimeInputField: ObjPred = (value, field) => includes(field, DATETIME_INPUT_FIELDS);

/**
 * Returns a callback to get the minimum date capacity from the given date ids
 */
export function minDateCapacity(allDates: Array<Datetime>) {
	return function getMinDateCapacity(limitToDateIds?: Array<EntityId>, filterInfinite = true) {
		// create a map of date ids to capacities
		const dateIdToCapacityMap = idToPropMap('capacity', allDates);

		const idsToUse = limitToDateIds?.length ? limitToDateIds : getGuids(allDates);

		// get capacity from the above map and parse it as infinity
		let capacities = idsToUse.map((dateId) => parseInfinity(dateIdToCapacityMap?.[dateId], Infinity));

		if (filterInfinite) {
			capacities = capacities.filter((capacity) => !isInfinite(capacity));
		}

		return Math.min(...capacities); // it will be Infinity for empty array;
	};
}
