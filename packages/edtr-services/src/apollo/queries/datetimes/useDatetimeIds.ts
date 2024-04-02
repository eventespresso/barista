import { useMemoStringify } from '@eventespresso/utils';
import { getGuids } from '@eventespresso/predicates';
import type { EntityId } from '@eventespresso/constants';
import useDatetimes from './useDatetimes';

const useDatetimeIds = (): EntityId[] => {
	const datetimes = useDatetimes();

	return useMemoStringify(getGuids(datetimes));
};

export default useDatetimeIds;
