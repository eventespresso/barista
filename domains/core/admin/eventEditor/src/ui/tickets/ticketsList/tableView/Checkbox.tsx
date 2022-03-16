import { ActionCheckbox } from '@eventespresso/ee-components';
import { USE_ADVANCED_EDITOR } from '@eventespresso/constants';
import { useVisibleTicketIds } from '@eventespresso/edtr-services';
import { withCurrentUserCan } from '@eventespresso/services';
import type { ActionCheckboxProps } from '@eventespresso/ee-components';

const Checkbox: React.FC<ActionCheckboxProps> = (props) => {
	const [visibleTicketIds] = useVisibleTicketIds();

	return <ActionCheckbox {...props} visibleEntityIds={visibleTicketIds} />;
};

export default withCurrentUserCan(USE_ADVANCED_EDITOR)(Checkbox);
