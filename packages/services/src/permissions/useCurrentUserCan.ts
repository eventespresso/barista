import { useCallback } from 'react';

import { useCurrentUser } from '@eventespresso/data';

import usePermissions from './usePermissions';
import type { CurrentUserCan } from './types';
import { entityPlurals } from './constants';

/**
 * Returns a callback to check whether current user has a capability.
 * @example
 * const currentUserCan = useCurrentUserCan();
 *
 * if (currentUserCan('use_bulk_edit'))
 *
 * @returns {CurrentUserCan}
 */
const useCurrentUserCan = (): CurrentUserCan => {
	const permissions = usePermissions();
	const currentUser = useCurrentUser();

	return useCallback<CurrentUserCan>(
		(capability = 'read', entityType, entity) => {
			// bail early if the user has the capability
			if (permissions?.includes(capability)) {
				return true;
			}

			// we need entityType to move forward
			if (!entityType) {
				return false;
			}

			const pluralEntityType = entityPlurals[entityType] || entityType;

			// e.g. ee_edit_default_tickets, ee_delete_others_default_tickets
			const computedPluralCap = `ee_${capability}_${pluralEntityType}`;

			if (permissions?.includes(computedPluralCap)) {
				return true;
			}

			if (!entity?.userId) {
				return false;
			}

			/**
			 * if we are dealing with a single entity permission check,
			 * we need to check the ownership
			 */
			if (entity.userId === currentUser.id) {
				return true;
			}

			// e.g. ee_delete_others_default_tickets, ee_read_others_default_tickets
			const computedOthersCap = `ee_${capability}_others_${pluralEntityType}`;

			return permissions?.includes(computedOthersCap);
		},
		[currentUser.id, permissions]
	);
};

export default useCurrentUserCan;
