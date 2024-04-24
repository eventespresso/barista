import type { SiteUrlProps } from './types';

export const SiteUrls = (props?: Partial<SiteUrlProps>): SiteUrlProps => {
	return {
		...defaultUrl,
		...props,
	};
};

const defaultUrl: SiteUrlProps = {
	admin: '',
	home: '',
};
