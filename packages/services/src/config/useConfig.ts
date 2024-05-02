import { useContext } from 'react';
import type { Type as ConfigType } from '@eventespresso/config';

import { ConfigContext } from '../context/ConfigProvider';

type Config = ConfigType.Config;

export const useConfig = (): Config => useContext<Config>(ConfigContext);
