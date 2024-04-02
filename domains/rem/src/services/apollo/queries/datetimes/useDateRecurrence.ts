import { useRelations } from '@eventespresso/services';
import type { EntityId } from '@eventespresso/constants';

import { useRecurrenceItem } from '../recurrences';
import type { Recurrence } from '../../types';

/**
 * Returns recurrence for the given date, if it's a recurring one
 * otherwise returns `undefined`
 */
const useDateRecurrence = (datetimeId: EntityId): Recurrence => {
	const { getRelations } = useRelations();
	const [recurrenceId] = getRelations({
		entity: 'datetimes',
		entityId: datetimeId,
		relation: 'recurrences',
	});

	return useRecurrenceItem({ id: recurrenceId });
};

export default useDateRecurrence;
