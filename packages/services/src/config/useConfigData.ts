import { useMemoStringify } from '@eventespresso/hooks';
import { Type as ConfigType, Factory as ConfigFactory } from '@eventespresso/config';
import { useMemo } from 'react';

type Config = ConfigType.Config;

export const useConfigData = (): Config => {
	const { config, api } = useMemoStringify(window.eventEspressoData);
	return useMemo(() => new ConfigFactory(config, api).get(), [api, config]);
};
