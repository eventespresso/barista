import type { LocaleProps } from '.';

export const Locale = ({ user, site }: LocaleProps): LocaleProps => ({
	user: createLocale(user),
	site: createLocale(site),
});

const defaultLocale = 'en-US';

function createLocale(any?: string): string {
	if (any) return any.replace('_', '-');
	return defaultLocale;
}
