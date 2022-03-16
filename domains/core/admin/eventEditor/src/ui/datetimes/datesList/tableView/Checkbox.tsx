import { ActionCheckbox } from '@eventespresso/ee-components';
import { USE_ADVANCED_EDITOR } from '@eventespresso/constants';
import { useVisibleDatetimeIds } from '@eventespresso/edtr-services';
import { withCurrentUserCan } from '@eventespresso/services';
import type { ActionCheckboxProps } from '@eventespresso/ee-components';

const Checkbox: React.FC<ActionCheckboxProps> = (props) => {
	const [visibleDatetimeIds] = useVisibleDatetimeIds();

	return <ActionCheckbox {...props} visibleEntityIds={visibleDatetimeIds} />;
};

export default withCurrentUserCan(USE_ADVANCED_EDITOR)(Checkbox);
