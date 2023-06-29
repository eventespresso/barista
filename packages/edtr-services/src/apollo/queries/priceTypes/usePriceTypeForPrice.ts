import isEmpty from 'ramda/src/isEmpty';

import { useMemoStringify } from '@eventespresso/hooks';
import { entitiesWithGuIdInArray } from '@eventespresso/predicates';
import { useRelations } from '@eventespresso/services';

import useDefaultPriceType from './useDefaultPriceType';
import usePriceTypes from './usePriceTypes';

import type { EntityId } from '@eventespresso/data';
import type { PriceType } from '../../types';

/**
 * A custom react hook for retrieving the related priceType from cache for the given Price entity
 *
 * @param {string} priceId price.id
 */
const usePriceTypeForPrice = (priceId: EntityId): PriceType | null => {
	const { getRelations } = useRelations();
	// get related priceTypes for this price
	const relatedPriceTypeIds = getRelations({
		entity: 'prices',
		entityId: priceId,
		relation: 'priceTypes',
	});

	// get the default price type object
	const defaultPriceType: PriceType | null = useDefaultPriceType();
	const allPriceTypes = usePriceTypes();

	const relatedPriceTypes = entitiesWithGuIdInArray(allPriceTypes, relatedPriceTypeIds);

	const priceType = !isEmpty(relatedPriceTypes) ? relatedPriceTypes[0] : defaultPriceType;

	return useMemoStringify(priceType);
};

export default usePriceTypeForPrice;
