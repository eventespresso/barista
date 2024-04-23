import type { LocaleProps } from './types';

export const Locale = (props?: Partial<LocaleProps>): LocaleProps => {
	return {
		site: siteLocale(props?.site),
		user: userLocale(props?.user),
	};
};

function siteLocale(prop?: LocaleProps['site']): LocaleProps['site'] {
	if (prop) return replace(prop);
	return 'en-US'; // default
}

function userLocale(prop?: LocaleProps['user']): LocaleProps['user'] {
	if (prop) return replace(prop);
	return 'en-US'; // default
}

function replace(input: string): string {
	return input.replace('_', '-');
}
