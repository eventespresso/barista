import { ADMIN_ROUTES, ADMIN_ROUTE_ACTION_DEFAULT } from '@eventespresso/constants';

export type AdminUrlProps = {
	action?: string | null;
	adminSiteUrl: string;
	page?: string;
};
export type GetAdminUrlFn = (props: AdminUrlProps) => string;

/**
 * Return the admin url for a given page and action.
 */
export const getAdminUrl: GetAdminUrlFn = ({
	action = ADMIN_ROUTE_ACTION_DEFAULT,
	adminSiteUrl,
	page = ADMIN_ROUTES.EVENTS,
}) => {
	return adminSiteUrl && `${adminSiteUrl}admin.php?page=${page}&action=${action}`;
};
