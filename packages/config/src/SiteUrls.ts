import type { Type } from '.';

export const SiteUrls = (config?: Partial<Type.SiteUrls>): Type.SiteUrls => ({
	...defaultUrls,
	...config,
});

const defaultUrls: Type.SiteUrls = {
	admin: '',
	home: '',
};
