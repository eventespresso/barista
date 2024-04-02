import { useCallback, useMemo, useState } from 'react';
import * as R from 'ramda';

import type { EntityId } from '@eventespresso/constants'

import { EventSmartDomData } from '../types';
import { useDismissUpsellAd } from '../services';

const DEFAULT_STATE: EventSmartDomData['edtrUpsellAds'] = window.eventEspressoData?.eventSmart?.edtrUpsellAds || [];

export type EdtrUpsellAds = {
	upsellAds: EventSmartDomData['edtrUpsellAds'];
	dismissUpsellAd: (id: EntityId) => () => Promise<void>;
};

export const useEdtrUpsellAds = (): EdtrUpsellAds => {
	const [upsellAds, setUpsellAds] = useState(DEFAULT_STATE);
	const sendDismissRequest = useDismissUpsellAd();

	const dismissUpsellAd = useCallback<EdtrUpsellAds['dismissUpsellAd']>(
		(id) => async () => {
			setUpsellAds((upsellAds) => upsellAds.filter(R.complement(R.propEq('id', id))));
			await sendDismissRequest(id);
		},
		[sendDismissRequest]
	);

	return useMemo(
		() => ({
			upsellAds,
			dismissUpsellAd,
		}),
		[dismissUpsellAd, upsellAds]
	);
};
