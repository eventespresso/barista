import { type Type as ConfigType, DateTimeFormats } from '@eventespresso/config';
import { createContext, useMemo } from 'react';

import { useConfigData } from '../config';
import { useCurrentUser, useGeneralSettings } from '@eventespresso/data';

const ConfigContext = createContext<ConfigType.Config | null>(null);

const { Provider, Consumer: ConfigConsumer } = ConfigContext;

const ConfigProvider: React.FC = ({ children }) => {
	const ConfigData = useConfigData();
	const currentUser = useCurrentUser();
	const generalSettings = useGeneralSettings();

	const config: ConfigType.Config = useMemo(
		() => ({
			...ConfigData,
			currentUser,
			dateTimeFormats: generalSettings && DateTimeFormats(generalSettings),
		}),
		[ConfigData, currentUser, generalSettings]
	);

	return <Provider value={config}>{children}</Provider>;
};

export { ConfigProvider, ConfigConsumer, ConfigContext };
