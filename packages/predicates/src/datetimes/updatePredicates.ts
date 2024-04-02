import { pickBy } from 'ramda';
import { isDatetimeField } from './selectionPredicates';
import type { Datetime } from '@eventespresso/constants';

export const copyDatetimeFields = <T>(datetime: T, predicate = isDatetimeField): Datetime =>
	pickBy(predicate, datetime);
