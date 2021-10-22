import { useEffect } from 'react';
import { pick } from 'ramda';

import { useForm } from '@eventespresso/form';
import { Ticket } from '@eventespresso/edtr-services';

import { useDataState } from '../data';
import { TpcPriceModifier } from '../types';

// The fields that need to be synced from TPC to ticket edit form
// This is to avoid ticket.name being synced
const TPC_TICKET_FIELDS_TO_SYNC: Array<keyof Ticket> = ['price', 'reverseCalculate'];

/**
 * A custom hook which subscribes and TPC data and updates
 * RFF data when needed.
 */
const useSyncTPC2RFF = (initialPrices?: TpcPriceModifier[]) => {
	const { mutators } = useForm();

	const { deletedPrices, prices, ticket, setPrices } = useDataState();
	useEffect(() => {
		const fieldsToSync = pick(TPC_TICKET_FIELDS_TO_SYNC, ticket);
		Object.entries(fieldsToSync).forEach(([key, value]) => {
			// update value of each field in RFF state
			mutators.updateFieldValue(key, value);
		});
		// duplicate prices in RFF state
		mutators.updateFieldValue('prices', prices);
		mutators.updateFieldValue('deletedPrices', deletedPrices);
	}, [deletedPrices, mutators, prices, ticket]);

	// This effect on mount, feeds initial prices to TPC
	useEffect(() => {
		// If we are lucky
		if (initialPrices) {
			// feed TPC the best peanut butter
			setPrices(initialPrices);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useSyncTPC2RFF;
