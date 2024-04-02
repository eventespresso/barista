import { useMemoStringify } from '@eventespresso/utils';
import type { AnyObject } from '@eventespresso/utils';
import { useFormValues } from '@eventespresso/form';
import { DateFormShape, useDatetimeItem } from '@eventespresso/edtr-services';

import { withContext as withTAMContext } from '@edtrUI/ticketAssignmentsManager/context';

import type { ContentWrapperProps } from './types';
import Modal from './Modal';

const ContentWrapper: React.FC<ContentWrapperProps> = (props) => {
	const { values: initialValues } = props.form.getState();
	const values = useFormValues<DateFormShape>(initialValues);

	const datetime = useDatetimeItem({ id: values?.id });
	// provide entity details to TAM from edit form
	const Component = withTAMContext<AnyObject>(
		Modal,
		useMemoStringify({
			assignmentType: 'forDate',
			entity: { id: 'NEW_DATE', dbId: 0, ...datetime, ...values } as any,
		})
	);

	return <Component {...props} />;
};

export default ContentWrapper;
