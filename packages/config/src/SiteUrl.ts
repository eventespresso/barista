import type { Type } from '.';

export const SiteUrl = (config?: Partial<Type.SiteUrls>): Type.SiteUrls => ({
	admin: config?.admin ?? defaultUrl,
	home: config?.home ?? defaultUrl,
});

const defaultUrl = '';
