import { useMemoStringify } from '@eventespresso/utils';
import { useFormValues } from '@eventespresso/form';
import { Datetime } from '@eventespresso/constants';
import { DateFormShape, useDatetimeItem } from '@eventespresso/edtr-services';

import { ContextProvider as TAMContextProvider } from '@edtrUI/ticketAssignmentsManager/context';
import Modal from './Modal';

import type { ContentWrapperProps } from './types';

const ContextProvider: React.FC<ContentWrapperProps> = (props) => {
	const { values: initialValues } = props.form.getState();
	const values = useFormValues<DateFormShape>(initialValues);

	const datetime = useDatetimeItem({ id: values?.id });

	// add defaults from Apollo cache and override the set values from form state
	const entity = useMemoStringify({ id: 'NEW_DATE', dbId: 0, ...datetime, ...values } as Datetime);

	return (
		<TAMContextProvider assignmentType='forDate' entity={entity}>
			<Modal {...props} />
		</TAMContextProvider>
	);
};

export default ContextProvider;
