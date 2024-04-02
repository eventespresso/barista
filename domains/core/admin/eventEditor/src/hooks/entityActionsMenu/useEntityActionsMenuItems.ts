import { useMemo } from 'react';

import { EntityActionsSubscription, EntityActionsMenuRegistry } from '@eventespresso/registry';
import { domain } from '@eventespresso/edtr-services';
import { useMemoStringify } from '@eventespresso/utils';
import type { Entity } from '@eventespresso/data';

const { getSubscriptions } = new EntityActionsSubscription(domain);

const useEntityActionsMenuItems = <E extends Entity, T extends string>(
	entityType: T,
	entity: E,
	filterByEntityType = true
): Array<React.ReactNode> => {
	const registry = useMemo(
		() => new EntityActionsMenuRegistry({ domain, entityType, entityId: entity.id }),
		[entity.id, entityType]
	);

	const { generateElements } = registry;

	const subscriptions = getSubscriptions({ entityType: filterByEntityType ? entityType : null });

	Object.values(subscriptions).forEach(({ callback }) => {
		callback({ entityType, entity, registry });
	});

	// it should only change if subscriptions change
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemoStringify(generateElements(), Object.keys(subscriptions));
};

export default useEntityActionsMenuItems;
