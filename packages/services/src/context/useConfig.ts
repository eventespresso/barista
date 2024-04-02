import { useContext } from 'react';
import type { ConfigDataProps } from '@eventespresso/config';

import { ConfigContext } from './ConfigProvider';

export const useConfig = (): ConfigDataProps => useContext<ConfigDataProps>(ConfigContext);
