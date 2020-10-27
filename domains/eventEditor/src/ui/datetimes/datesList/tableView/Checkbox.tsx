import React from 'react';

import { ActionCheckbox } from '@eventespresso/components';
import { useVisibleDatetimeIds } from '@eventespresso/edtr-services';
import { withFeature } from '@eventespresso/services';
import type { ActionCheckboxProps } from '@eventespresso/components';

const Checkbox: React.FC<ActionCheckboxProps> = (props) => {
	const [visibleDatetimeIds] = useVisibleDatetimeIds();

	return <ActionCheckbox {...props} visibleEntityIds={visibleDatetimeIds} />;
};

export default withFeature('use_bulk_edit')(Checkbox);
