import type { SiteUrlProps } from './types';

export const SiteUrl = (props?: Partial<SiteUrlProps>): SiteUrlProps => {
	return {
		...defaultUrl,
		...props,
	};
};

const defaultUrl: SiteUrlProps = {
	admin: '',
	home: '',
};
