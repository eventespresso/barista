import { Timezone, Type } from '.';

export const Locale = (config?: Partial<Type.Locale>): Type.Locale => ({
	user: createLocale(config?.user ?? defaultLocale),
	site: createLocale(config?.site ?? defaultLocale),
	siteTimezone: Timezone(config?.siteTimezone),
});

const defaultLocale = 'en-US';

function createLocale(string: string): string {
	return string.replace('_', '-');
}
