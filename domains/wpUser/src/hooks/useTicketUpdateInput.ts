import { useEffect } from 'react';

import { hooks, Filters } from '@eventespresso/edtr-services';

import { NAMESPACE } from '../constants';

const filterName: keyof Filters = 'eventEditor.ticket.mutationInput';

/**
 * A custom hook to update initial values of ticket edit form
 */
const useTicketUpdateInput = (): void => {
	useEffect(() => {
		hooks.addFilter(filterName, NAMESPACE, (input, { capabilityRequired, customCapabilityRequired } = {}) => {
			switch (true) {
				// if capabilityRequired is not being updated
				case typeof capabilityRequired !== 'string':
					return input;

				case capabilityRequired === 'custom':
					return {
						...input,
						capabilityRequired: customCapabilityRequired,
					};

				case capabilityRequired === 'none':
					// remove capability if 'none' is selected
					return {
						...input,
						capabilityRequired: '',
					};

				// it's some dynamic capability value, selected from the list
				default:
					return {
						...input,
						capabilityRequired,
					};
			}
		});

		// housekeeping
		return () => {
			hooks.removeFilter(filterName, NAMESPACE);
		};
	}, []);
};

export default useTicketUpdateInput;
