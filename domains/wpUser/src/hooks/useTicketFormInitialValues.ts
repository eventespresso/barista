import { useEffect } from 'react';

import { hooks, useTicketsMeta, Filters } from '@eventespresso/edtr-services';
import { getOptionValues } from '@eventespresso/utils';
import { useMemoStringify } from '@eventespresso/hooks';

import { NAMESPACE } from '../constants';
import useCapabilityOptions from './useCapabilityOptions';

const filterName: keyof Filters = 'eventEditor.ticketForm.initalValues';

/**
 * A custom hook to update initial values of ticket edit form
 */
const useTicketFormInitialValues = (): void => {
	const { getMetaValue } = useTicketsMeta();
	const capabilityOptions = useCapabilityOptions();
	const optionValues = useMemoStringify(getOptionValues(capabilityOptions));

	useEffect(() => {
		// make sure to remove the previously registered hook
		hooks.removeFilter(filterName, NAMESPACE);

		hooks.addFilter(filterName, NAMESPACE, (initialValues, ticket) => {
			// ticket the value from meta. It will be empty for new tickets
			let capabilityRequired = getMetaValue<string>(ticket?.id, 'capabilityRequired', 'none');
			let customCapabilityRequired = '';

			// if capabilityRequired has some unknown value
			// it means, custom option should be selected
			if (!optionValues.includes(capabilityRequired)) {
				customCapabilityRequired = `${capabilityRequired}`;
				capabilityRequired = 'custom';
			}

			return {
				...initialValues,
				capabilityRequired,
				customCapabilityRequired,
			};
		});

		// housekeeping
		return () => {
			hooks.removeFilter(filterName, NAMESPACE);
		};
	}, [getMetaValue, optionValues]);
};

export default useTicketFormInitialValues;
