import { LocaleDomData, Timezone } from '.';

export const Locale = (props?: Partial<LocaleDomData>): LocaleDomData => {
	return {
		site: siteLocale(props?.site),
		user: userLocale(props?.user),
		siteTimezone: Timezone(props?.siteTimezone),
	};
};

function siteLocale(prop?: LocaleDomData['site']): LocaleDomData['site'] {
	if (prop) return replace(prop);
	return 'en-US'; // default
}

function userLocale(prop?: LocaleDomData['user']): LocaleDomData['user'] {
	if (prop) return replace(prop);
	return 'en-US'; // default
}

function replace(input: string): string {
	return input.replace('_', '-');
}
