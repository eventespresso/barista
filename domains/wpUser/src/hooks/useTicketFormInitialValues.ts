import { useEffect } from 'react';

import { hooks, useTicketsMeta, Filters } from '@eventespresso/edtr-services';
import { getOptionValues } from '@eventespresso/utils';
import { useMemoStringify } from '@eventespresso/hooks';
import { getEEDomData } from '@eventespresso/services';

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
			const ticketID = ticket?.id;
			console.log('%c ticketID', 'color: cyan;', ticketID);
			// ticket the value from meta. It will be empty for new tickets
			let capabilityRequired = getMetaValue<string>(ticketID, 'capabilityRequired', 'none');
			let customCapabilityRequired = '';

			console.log('%c capabilityRequired', 'color: HotPink;', capabilityRequired);
			console.log('%c customCapabilityRequired', 'color: HotPink;', customCapabilityRequired);

			const ticketMeta = getEEDomData('wpUserData')?.ticketMeta;
			console.log('%c ticketMeta', 'color: LimeGreen;', ticketMeta);
			capabilityRequired = ticketMeta?.[ticketID]?.capabilityRequired || capabilityRequired;

			console.log('%c capabilityRequired', 'color: HotPink;', capabilityRequired);

			// if capabilityRequired has some unknown value
			// it means, custom option should be selected
			if (!optionValues.includes(capabilityRequired)) {
				customCapabilityRequired = `${capabilityRequired}`;
				capabilityRequired = 'custom';
			}

			console.log('%c capabilityRequired', 'color: HotPink;', capabilityRequired);
			console.log('%c customCapabilityRequired', 'color: HotPink;', customCapabilityRequired);

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
