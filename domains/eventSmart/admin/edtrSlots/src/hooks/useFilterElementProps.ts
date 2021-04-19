import { useEffect } from 'react';

import { hooks as edtrHooks, Filters as EdtrFilters } from '@eventespresso/edtr-services';
import { hooks as tpcHooks, Filters as TpcFilters } from '@eventespresso/tpc';

import { NAMESPACE } from '../constants';
import { useCanUseAdvancedEditor } from './useCanUseAdvancedEditor';

const datesInlineDesc: keyof EdtrFilters = 'eventEditor.datetimes.inlineDescriptionProps';
const ticketsInlineDesc: keyof EdtrFilters = 'eventEditor.tickets.inlineDescriptionProps';
const tpcDisabled: keyof TpcFilters = 'tpc.ticket.isDisabled';

/**
 * A custom hook to change the props for different UI elements
 */
export const useFilterElementProps = (): void => {
	const canUseEdtr = useCanUseAdvancedEditor();

	useEffect(() => {
		// bail early if all good
		if (canUseEdtr) {
			return;
		}
		const isDisabled = !canUseEdtr;

		edtrHooks.addFilter(datesInlineDesc, NAMESPACE, (props) => {
			return { ...props, isDisabled };
		});
		edtrHooks.addFilter(ticketsInlineDesc, NAMESPACE, (props) => {
			return { ...props, isDisabled };
		});
		tpcHooks.addFilter(tpcDisabled, NAMESPACE, (isTPCDisabled) => {
			return isTPCDisabled || isDisabled;
		});

		// housekeeping
		return () => {
			edtrHooks.removeFilter(datesInlineDesc, NAMESPACE);
			edtrHooks.removeFilter(ticketsInlineDesc, NAMESPACE);
			tpcHooks.removeFilter(tpcDisabled, NAMESPACE);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
