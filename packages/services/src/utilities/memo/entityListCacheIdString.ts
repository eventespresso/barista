import { Entity } from '@eventespresso/data';
import { getCacheIds } from '@eventespresso/services';

const entityListCacheIdString = <E extends Entity>(entities: E[]): string => JSON.stringify(getCacheIds(entities));

export default entityListCacheIdString;
