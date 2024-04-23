import type { GeneralSettingsProps as Data } from '.';

export function GeneralSettings(props?: Partial<Data>): Data {
	return {
		...defaultSettings,
		...props,
	};
}

// TODO: what should be the default values here?
const defaultSettings: Data = {
	dateFormat: '',
	timeFormat: '',
	timezone: '',
};
