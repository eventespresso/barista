import React from 'react';

import { ActionCheckbox, ActionCheckboxProps } from '@eventespresso/components';

import { useEdtrState } from '@eventespresso/edtr-services';

const Checkbox: React.FC<ActionCheckboxProps> = (props) => {
	const { visibleDatetimeIds } = useEdtrState();

	return <ActionCheckbox {...props} visibleEntityIds={visibleDatetimeIds} />;
};

export default Checkbox;
