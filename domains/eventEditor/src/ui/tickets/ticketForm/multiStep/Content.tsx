import { useCallback, useMemo } from 'react';

import { useTicketMutator, hooks } from '@eventespresso/edtr-services';
import { useMutatePrices } from '@eventespresso/tpc';
import { FormWithConfig } from '@eventespresso/ee-components';
import useTicketFormConfig from '../useTicketFormConfig';
import ContentWrapper from './ContentWrapper';
import type { ContentProps } from './types';
import useCapQuantity from '@edtrUI/tickets/hooks/useCapQuantity';

const Content: React.FC<ContentProps> = ({ entity, onClose }) => {
	const { createEntity, updateEntity } = useTicketMutator();
	const mutatePrices = useMutatePrices();

	const mutateTicket = useCallback(
		(input) => {
			const finalInput = hooks.applyFilters('eventEditor.ticketForm.mutationInput', input, entity?.id);
			return entity?.id ? updateEntity(finalInput) : createEntity(finalInput);
		},
		[createEntity, entity?.id, updateEntity]
	);
	const getCappedQuantity = useCapQuantity();
	const onSubmit = useCallback(
		({ prices, deletedPrices, ...fields }) => {
			mutatePrices(prices, deletedPrices).then((relatedPriceIds) => {
				const quantity = getCappedQuantity(fields.datetimes, fields.quantity);
				const input = { ...fields, prices: relatedPriceIds, quantity };
				mutateTicket(input);
			});
			onClose();
		},
		[getCappedQuantity, mutatePrices, mutateTicket, onClose]
	);

	const config = useMemo(() => ({ onSubmit }), [onSubmit]);
	const formConfig = useTicketFormConfig(entity?.id, config);

	return <FormWithConfig {...formConfig} formWrapper={ContentWrapper} />;
};

export default Content;
