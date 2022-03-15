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
 * if (currentUserCan('ee_event_editor_bulk_edit'))
 *
 * @returns {CurrentUserCan}
 */
const useCurrentUserCan = (): CurrentUserCan => {
	const permissions = usePermissions();
	const currentUser = useCurrentUser();

	return useCallback<CurrentUserCan>(
		(capability, entityType, entity) => {
			if (currentUser?.isa) {
				return true;
			}
			// bail early if the user has the capability
			if (!entityType) {
				return permissions?.includes(capability);
			}

			const pluralEntityType = entityPlurals[entityType] || entityType;

			// e.g. ee_delete_others_default_tickets, ee_read_others_default_tickets
			const computedOthersCap = `ee_${capability}_others_${pluralEntityType}`;
			// return true if user can manage ANY entity of this type
			if (permissions?.includes(computedOthersCap)) {
				return true;
			}

			// e.g. ee_edit_default_tickets, ee_delete_others_default_tickets
			const computedPluralCap = `ee_${capability}_${pluralEntityType}`;

			if (permissions?.includes(computedPluralCap)) {
				return true;
			}

			// if we are dealing with a single entity permission check,
			// we need to check the ownership
			if (entity?.userId === currentUser.id) {
				return true;
			}

			return false;
		},
		[currentUser.id, currentUser.isa, permissions]
	);
};

export default useCurrentUserCan;
