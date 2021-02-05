import type { KeysOfType } from '@eventespresso/utils';
import { PriceBaseInput } from './types';

export const NUMERIC_FIELDS: Array<KeysOfType<PriceBaseInput, number>> = ['amount', 'order', 'overrides', 'wpUser'];

export const BOOLEAN_FIELDS: Array<KeysOfType<PriceBaseInput, boolean>> = ['isDefault', 'isTrashed'];
