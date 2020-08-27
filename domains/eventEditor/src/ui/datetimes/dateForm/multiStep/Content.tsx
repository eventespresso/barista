import React, { useCallback, useMemo } from 'react';

import {
	useDatetimeMutator,
	useTicketQuantityForCapacity,
	useUpdateRelatedTickets,
} from '@eventespresso/edtr-services';
import { FormWithConfig } from '@eventespresso/components';
import useDatetimeFormConfig from '../useDateFormConfig';
import ContentWrapper from './ContentWrapper';
import type { ContentProps } from './types';

const Content: React.FC<ContentProps> = ({ entity, onClose }) => {
	const { createEntity, updateEntity } = useDatetimeMutator();

	const updateRelatedTickets = useUpdateRelatedTickets(entity?.id);
	const ticketQuantityForCapacity = useTicketQuantityForCapacity();

	const onSubmit = useCallback(
		(fields) => {
			// If it's an existing entity
			if (entity?.id) {
				// Update it
				updateEntity(fields);

				// whether date capacity has been changed
				const capacityChanged = fields?.capacity !== entity?.capacity;
				// if true, we need to update the quantity of all the related tickets
				if (capacityChanged) {
					const inputGenerator = ticketQuantityForCapacity(fields?.capacity);
					updateRelatedTickets(inputGenerator, fields?.tickets);
				}
			} else {
				// otherwise create it
				createEntity(fields);
			}
			onClose();
		},
		[
			createEntity,
			entity?.capacity,
			entity?.id,
			onClose,
			ticketQuantityForCapacity,
			updateEntity,
			updateRelatedTickets,
		]
	);
	const config = useMemo(() => ({ onSubmit }), [onSubmit]);
	const formConfig = useDatetimeFormConfig(entity?.id, config);

	return <FormWithConfig {...formConfig} formWrapper={ContentWrapper} />;
};

export default Content;
