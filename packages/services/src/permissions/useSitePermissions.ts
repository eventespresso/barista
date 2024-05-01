import { useMemo } from 'react';

import { useConfig } from '../config';
import type { Type as ConfigType } from '@eventespresso/config';

const useSitePermissions = (): ConfigType.Config['sitePermissions'] => {
	const { sitePermissions } = useConfig();

	return useMemo(() => sitePermissions || [], [sitePermissions]);
};

export default useSitePermissions;
