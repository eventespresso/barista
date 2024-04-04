import { useMemo } from 'react';
import * as R from 'ramda';

import type { EspressoFormProps } from '@eventespresso/form';
import type { Ticket } from '@eventespresso/constants';
import type { TicketFormConfig } from '@eventespresso/edtr-services';
import useMainTicketFormConfig, { FIELD_NAMES } from '../../ticketForm/useTicketFormConfig';
import { DefaultTicket } from '../data';

const useTicketFormConfig = (ticket?: DefaultTicket, config?: EspressoFormProps): TicketFormConfig => {
	const newConfig = useMainTicketFormConfig(ticket?.id, config);

	return useMemo(
		() => ({
			...newConfig,
			initialValues: {
				...newConfig?.initialValues,
				...R.pick<Omit<Partial<DefaultTicket>, 'prices'>, keyof Ticket>(FIELD_NAMES, ticket || {}),
			},
		}),
		[newConfig, ticket]
	);
};

export default useTicketFormConfig;
