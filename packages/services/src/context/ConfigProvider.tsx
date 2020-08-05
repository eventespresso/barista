import React, { createContext, useMemo } from 'react';

import { CurrentUser, DateTimeFormats, useConfigData, ConfigDataProps } from '../config';
import { useCurrentUser, useGeneralSettings } from '@eventespresso/data';

const ConfigContext = createContext<ConfigDataProps | null>(null);

const { Provider, Consumer: ConfigConsumer } = ConfigContext;

const ConfigProvider: React.FC = ({ children }) => {
	const ConfigData = useConfigData();
	const currentUser = useCurrentUser();
	const generalSettings = useGeneralSettings();

	const config: ConfigDataProps = useMemo(
		() => ({
			...ConfigData,
			currentUser: currentUser && CurrentUser(currentUser),
			dateTimeFormats: generalSettings && DateTimeFormats(generalSettings),
		}),
		[ConfigData, currentUser, generalSettings]
	);

	return <Provider value={config}>{children}</Provider>;
};

export { ConfigProvider, ConfigConsumer, ConfigContext };
