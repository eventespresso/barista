import { useMemo } from 'react';
import { addQueryArgs } from '@wordpress/url';

import { ADMIN_ROUTES } from '@eventespresso/constants';
import { useConfig, getAdminUrl } from '@eventespresso/services';

export const useVenueLink = (type: 'create_new' | 'edit', venueDbId?: number) => {
	const { siteUrl } = useConfig();

	return useMemo(() => {
		const adminUrl = getAdminUrl({
			adminSiteUrl: siteUrl.admin,
			page: ADMIN_ROUTES.VENUES,
		});
		return addQueryArgs(adminUrl, {
			post: venueDbId,
			action: type,
			return: 'edit',
		});
	}, [siteUrl.admin, type, venueDbId]);
};
