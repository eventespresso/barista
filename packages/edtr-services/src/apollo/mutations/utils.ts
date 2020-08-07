import { v4 as uuidv4 } from 'uuid';

import { entitiesWithGuIdInArray, entitiesWithGuIdNotInArray } from '@eventespresso/predicates';
import { shiftDate, AnyObject } from '@eventespresso/services';
import type { EntityId } from '@eventespresso/data';

import { BulkUpdateInput, BulkEditFormBaseShape } from './types';
import { Datetime, Ticket } from '../types';
import { UpdateDatetimeInput } from '../..';
import { UpdateTicketInput } from './tickets';

export const formToBulkUpdateInput = <
	T extends BulkEditFormBaseShape,
	E extends Datetime | Ticket,
	I extends AnyObject
>(
	formData: T,
	allEntities: E[],
	selectedIds: EntityId[]
): BulkUpdateInput<I> => {
	const { shiftDates, ...values } = formData;
	// This contains the unique input for each entity.
	let uniqueInputs: BulkUpdateInput['uniqueInputs'] = [];
	// we need to shift the dates.
	if (shiftDates?.unit && shiftDates?.value && shiftDates?.type) {
		// get full entity objects from the selected IDs
		const selectedEntities = entitiesWithGuIdInArray(allEntities, selectedIds);
		// keep the date shifter ready
		const shiftTheDate = shiftDate(shiftDates);
		// shift start and end dates for the selected entities
		uniqueInputs = selectedEntities.map((entity) => {
			const startDate = shiftTheDate(entity.startDate).toISOString();
			const endDate = shiftTheDate(entity.endDate).toISOString();
			return { id: entity.id, startDate, endDate };
		});
	} else {
		// otherwise we just need the ids for uniqueInputs
		uniqueInputs = selectedIds.map((id) => ({ id }));
	}

	// we need to add id to shared input to avoid GQL schema yelling at us.
	const sharedInput = { ...values, id: '' };

	return {
		sharedInput,
		uniqueInputs,
	} as BulkUpdateInput<any>;
};

export const cacheNodesFromBulkInput = <T extends UpdateDatetimeInput | UpdateTicketInput, E extends Datetime | Ticket>(
	input: BulkUpdateInput<T>,
	allEntities: E[]
): E[] => {
	// convert uniqueInputs array to object with ids as keys and the objects as values
	const uniqueInputs = input.uniqueInputs.reduce((inputs, currentInput) => {
		return { ...inputs, [currentInput.id]: currentInput };
	}, {});

	// override the data for the selected nodes from the given input
	const nodes = allEntities.map<E>((node) => {
		// if the node is not in selected nodes
		if (!uniqueInputs?.[node.id]) {
			return node;
		}
		return {
			...node,
			...input.sharedInput,
			...uniqueInputs[node.id],
			cacheId: uuidv4(),
		};
	});

	return nodes;
};

export const cacheNodesFromBulkDelete = <E extends Datetime | Ticket>(
	entityIds: Array<EntityId>,
	allEntities: E[],
	deletePermanently?: boolean
): E[] => {
	if (deletePermanently) {
		return entitiesWithGuIdNotInArray(allEntities, entityIds);
	}

	// mark all entities as trashed
	const nodes = allEntities.map<E>((node) => {
		// if the node is not in selected nodes
		if (!entityIds.includes(node.id)) {
			return node;
		}
		return {
			...node,
			isTrashed: true,
			cacheId: uuidv4(),
		};
	});

	return nodes;
};
