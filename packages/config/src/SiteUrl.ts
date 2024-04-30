import type { SiteUrlProps } from '.';

export const SiteUrl = ({ admin, home }: SiteUrlProps): SiteUrlProps => {
	return {
		admin: admin || '',
		home: home || '',
	};
};
