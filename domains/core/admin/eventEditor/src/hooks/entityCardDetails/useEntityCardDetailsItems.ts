import { useMemo } from 'react';

import type { EntityId } from '@eventespresso/constants';
import { EntityCardDetailsSubscription, EntityCardDetailsRegistry } from '@eventespresso/registry';
import { domain } from '@eventespresso/edtr-services';
import { useMemoStringify } from '@eventespresso/utils';

const { getSubscriptions } = new EntityCardDetailsSubscription(domain);

const useEntityCardDetailsItems = <T extends string>(
	entityType: T,
	entityId: EntityId,
	filterByEntityType = true
): Array<React.ReactNode> => {
	const registry = useMemo(
		() => new EntityCardDetailsRegistry({ domain, entityType, entityId }),
		[entityId, entityType]
	);

	const { generateElements } = registry;

	const subscriptions = getSubscriptions({ entityType: filterByEntityType ? entityType : null });

	Object.values(subscriptions).forEach(({ callback }) => {
		callback({ entityType, entityId, registry });
	});

	// it should only change if subscriptions change
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemoStringify(generateElements(), Object.keys(subscriptions));
};

export default useEntityCardDetailsItems;
