import { EntityActionsMenu } from '@eventespresso/ui-components';
import { Datetime } from '@eventespresso/constants';
import type { ActionsMenuComponentProps } from '@eventespresso/registry';

import useDatesActionMenuItems from '../../hooks/useDatesActionMenuItems';

const DateActionsMenu: React.FC<ActionsMenuComponentProps<Datetime>> = ({ entity, ...props }) => {
	const menuItems = useDatesActionMenuItems(entity);

	return <EntityActionsMenu {...props} menuItems={menuItems} />;
};

export default DateActionsMenu;
