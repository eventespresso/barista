import { useCallback } from 'react';

import { useFormValues } from '@eventespresso/form';
import { useTicketItem, useTicketPrices } from '@eventespresso/edtr-services';
import { useMemoStringify } from '@eventespresso/utils';
import { ContextProvider as TPCContextProvider, usePriceToTpcModifier, preparePricesForTpc } from '@eventespresso/tpc';
import { ContextProvider as TAMContextProvider } from '@edtrUI/ticketAssignmentsManager/context';
import Modal from './Modal';

import type { Ticket } from '@eventespresso/constants';
import type { TicketFormShape } from '@eventespresso/edtr-services';
import type { ContentWrapperProps } from './types';

const ContextProvider: React.FC<ContentWrapperProps> = (props) => {
	const { values: initialValues } = props.form.getState();
	const values = useFormValues<TicketFormShape>(initialValues);

	const ticket = useTicketItem({ id: values?.id });
	const priceToTpcModifier = usePriceToTpcModifier();
	const getTheTicketPrices = useTicketPrices();

	// add defaults from Apollo cache and override the set values from form state
	const entity = useMemoStringify({ id: 'NEW_TICKET', dbId: 0, ...ticket, ...values } as Ticket);

	const getTicket = useCallback(() => entity, [entity]);

	const getTicketPrices = useCallback(
		(ticketId: string) => {
			// we have prices in the form values, it means they have been added, lets use those
			const prices = values?.prices || preparePricesForTpc(getTheTicketPrices(ticketId), priceToTpcModifier);

			return prices;
		},
		[priceToTpcModifier, getTheTicketPrices, values?.prices]
	);

	return (
		<TAMContextProvider assignmentType='forTicket' entity={entity}>
			<TPCContextProvider ticketId={entity.id} getTicket={getTicket} getTicketPrices={getTicketPrices}>
				<Modal {...props} />
			</TPCContextProvider>
		</TAMContextProvider>
	);
};

export default ContextProvider;
