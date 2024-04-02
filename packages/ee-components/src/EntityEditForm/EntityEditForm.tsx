import { useForm } from '@eventespresso/form';
import { useSiteDateToUtcISO } from '@eventespresso/services';
import { useMemoStringify } from '@eventespresso/utils';
import type { Entity } from '@eventespresso/data';

import type { EntityEditBaseProps } from './types';

interface EntityEditFormProps {
	Component: React.ComponentType<Partial<EntityEditBaseProps<Entity>>>;
	newEntityId: string;
}

const EntityEditForm: React.FC<EntityEditFormProps> = ({ Component, newEntityId }) => {
	const { getState } = useForm<any>();
	const toUtcISO = useSiteDateToUtcISO();

	const values = getState().values;

	const entity = useMemoStringify(
		{
			...values,
			id: values.id ?? newEntityId,
			dbId: values.dbId ?? 0,
			startDate: values?.startDate ? toUtcISO(values.startDate) : '',
			endDate: values?.endDate ? toUtcISO(values.endDate) : '',
		},
		[values]
	);

	return <Component entity={entity} />;
};

export default EntityEditForm;
