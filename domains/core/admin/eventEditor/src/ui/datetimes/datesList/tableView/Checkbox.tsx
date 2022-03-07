import { ActionCheckbox } from '@eventespresso/ee-components';
import { useVisibleDatetimeIds } from '@eventespresso/edtr-services';
import { withFeature } from '@eventespresso/services';
import type { ActionCheckboxProps } from '@eventespresso/ee-components';

const Checkbox: React.FC<ActionCheckboxProps> = (props) => {
	const [visibleDatetimeIds] = useVisibleDatetimeIds();

	return <ActionCheckbox {...props} visibleEntityIds={visibleDatetimeIds} />;
};

export default withFeature('ee_event_editor_bulk_edit')(Checkbox);
