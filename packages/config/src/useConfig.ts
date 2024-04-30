import { useContext } from 'react';
import { ConfigContext } from '@eventespresso/services';

import type { ConfigDataProps } from '.';

export const useConfig = (): ConfigDataProps => useContext<ConfigDataProps>(ConfigContext);
