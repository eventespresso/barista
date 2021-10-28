import { allPass } from 'ramda';

import type { TpcPriceModifier } from '@eventespresso/tpc';
import { isPercent, isBasePrice, isDiscount, isTax, isNotDiscount, isNotPercent } from '@eventespresso/predicates';

export const getPriceTypeLabel = (price: TpcPriceModifier): string => {
	switch (true) {
		case isBasePrice(price):
			return 'Base Price';

		case isTax(price):
			return 'Federal Tax';

		case allPass([isPercent, isDiscount])(price):
			return 'Percent Discount';

		case allPass([isNotPercent, isDiscount])(price):
			return 'Dollar Discount';

		case allPass([isPercent, isNotDiscount])(price):
			return 'Percent Surcharge';

		// The default/fallback label
		default:
			return 'Dollar Surcharge';
	}
};
