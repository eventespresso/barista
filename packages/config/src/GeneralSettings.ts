import { Type } from './types';

export function GeneralSettings(config?: Partial<Type.GeneralSettings>): Type.GeneralSettings {
	return { ...defaultSettings, ...config };
}

const defaultSettings: Type.GeneralSettings = {
	dateFormat: '',
	timeFormat: '',
	timezone: '',
};
