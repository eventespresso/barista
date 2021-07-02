import * as R from 'ramda';

import type { EntityFieldPred } from '@eventespresso/utils';

export type IsDefaultPred = EntityFieldPred<'isDefault', boolean>;

export const isDefault: IsDefaultPred = R.propEq('isDefault', true);

export const isNotDefault: IsDefaultPred = R.complement(isDefault);
