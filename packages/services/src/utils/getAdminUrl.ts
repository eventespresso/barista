import { ADMIN_ROUTES, ADMIN_ROUTE_ACTION_DEFAULT } from '@eventespresso/constants';

export type AdminUrlProps = {
	action?: string | null;
	adminSiteUrl: string;
	page?: string;
};

/**
 * Return the admin url for a given page and action.
 */
export const getAdminUrl = ({
	action = ADMIN_ROUTE_ACTION_DEFAULT,
	adminSiteUrl,
	page = ADMIN_ROUTES.EVENTS,
}: AdminUrlProps): string => {
	return adminSiteUrl && `${adminSiteUrl}admin.php?page=${page}&action=${action}`;
};
