import { useEntityCardDetailsItems } from '@edtrHooks/index';
import type { EntityId } from '@eventespresso/constants';

const useDateCardDetailsItems = (datetimeId: EntityId): Array<React.ReactNode> => {
	return useEntityCardDetailsItems('datetime', datetimeId);
};

export default useDateCardDetailsItems;
