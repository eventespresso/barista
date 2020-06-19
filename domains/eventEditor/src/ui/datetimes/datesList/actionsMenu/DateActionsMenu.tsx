import React from 'react';

import { ActionsMenuComponentProps, EntityActionsMenu } from '@eventespresso/unknown'; // '@appLayout/entityActionsMenu';
import useDatesActionMenuItems from '../../hooks/useDatesActionMenuItems';
import { Datetime } from '@eventespresso/edtr-services';
import { getPropsAreEqual } from '@eventespresso/services';

const DateActionsMenu: React.FC<ActionsMenuComponentProps<Datetime>> = ({ entity, ...props }) => {
	const menuItems = useDatesActionMenuItems(entity);

	return <EntityActionsMenu {...props} menuItems={menuItems} />;
};

export default React.memo(DateActionsMenu, getPropsAreEqual(['entity', 'cacheId']));
