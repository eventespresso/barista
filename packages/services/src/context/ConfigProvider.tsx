import { createContext, useMemo } from 'react';

import { DateTimeFormats, useConfigData } from '@eventespresso/config';
import type { ConfigDataProps } from '@eventespresso/config';
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
			currentUser,
			dateTimeFormats: generalSettings && DateTimeFormats(generalSettings),
		}),
		[ConfigData, currentUser, generalSettings]
	);

	return <Provider value={config}>{children}</Provider>;
};

export { ConfigProvider, ConfigConsumer, ConfigContext };
