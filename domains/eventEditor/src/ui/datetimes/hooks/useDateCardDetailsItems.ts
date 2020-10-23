import React from 'react';

import type { EntityId } from '@eventespresso/data';
import { useEntityCardDetailsItems } from '@edtrHooks/index';

const useDateCardDetailsItems = (datetimeId: EntityId): Array<React.ReactNode> => {
	return useEntityCardDetailsItems('datetime', datetimeId);
};

export default useDateCardDetailsItems;
