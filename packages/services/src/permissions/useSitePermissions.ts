import { useMemo } from 'react';
import type { ConfigDataProps } from '@eventespresso/config';

import { useConfig } from '../context';

const useSitePermissions = (): ConfigDataProps['sitePermissions'] => {
	const { sitePermissions } = useConfig();

	return useMemo(() => sitePermissions || [], [sitePermissions]);
};

export default useSitePermissions;
