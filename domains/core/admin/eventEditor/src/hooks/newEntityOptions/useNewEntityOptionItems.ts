import { useMemo } from 'react';

import { NewEntitySubscription, NewEntityOptionsRegistry } from '@eventespresso/registry';
import { domain } from '@eventespresso/edtr-services';
import { useMemoStringify } from '@eventespresso/utils';

const { getSubscriptions } = new NewEntitySubscription(domain);

const useNewEntityOptionItems = <T extends string>(
	entityType: T,
	filterByEntityType = true
): Array<React.ReactNode> => {
	const registry = useMemo(() => new NewEntityOptionsRegistry({ domain, entityType }), [entityType]);

	const { generateElements } = registry;

	const subscriptions = getSubscriptions({ entityType: filterByEntityType ? entityType : null });

	Object.values(subscriptions).forEach(({ callback }) => {
		callback({ entityType, registry });
	});

	// it should only change if subscriptions change
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemoStringify(generateElements(), Object.keys(subscriptions));
};

export default useNewEntityOptionItems;
