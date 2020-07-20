import React, { useEffect, useCallback } from 'react';

import { NewEntitySubscription } from '@eventespresso/registry';
import { domain, Datetime } from '@eventespresso/edtr-services';
import type { NewEntitySubscriptionCb } from '@eventespresso/registry';
import RemButton from '../../ui/RemButton';
import { DatetimeProvider } from '../../context';

type DatesSubscriptionCallback = NewEntitySubscriptionCb<'datetime'>;

const { subscribe } = new NewEntitySubscription(domain);

const useNewDateOptionSubscription = (): void => {
	const newDateOptionsHandler = useCallback<DatesSubscriptionCallback>(({ registry }) => {
		const { registerElement: registerOptionItem } = registry;

		registerOptionItem(
			'rem',
			() => {
				return (
					<DatetimeProvider datetime={{} as Datetime}>
						<RemButton />
					</DatetimeProvider>
				);
			},
			11
		);
	}, []);

	useEffect(() => {
		const unsubscribeNewDateOptions = subscribe(newDateOptionsHandler, { entityType: 'datetime' });

		return (): void => {
			unsubscribeNewDateOptions();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useNewDateOptionSubscription;
