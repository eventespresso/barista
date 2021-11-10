import { useMemo } from 'react';
import { addQueryArgs } from '@wordpress/url';

import { ADMIN_ROUTES } from '@eventespresso/constants';
import { useConfig, getAdminUrl } from '@eventespresso/services';

import { useEventId } from '../apollo/queries';
import { QueryURLRegStatus } from '../types';

export type RegistrationsLinkArgs = {
	datetime_id?: number;
	ticket_id?: number;
	_reg_status?: QueryURLRegStatus;
};

export const useRegistrationsLink = (args: RegistrationsLinkArgs): string => {
	const { siteUrl } = useConfig();
	const eventId = useEventId();

	return useMemo(() => {
		const adminUrl = getAdminUrl({
			adminSiteUrl: siteUrl.admin,
			page: ADMIN_ROUTES.REGISTRATIONS,
		});
		return addQueryArgs(adminUrl, {
			event_id: eventId,
			return: 'edit',
			...args,
		});
	}, [args, eventId, siteUrl.admin]);
};
