import { useCallback, useMemo } from 'react';
import { assocPath, dissocPath, mergeDeepRight } from 'ramda';

import { ReactiveVar, useReactiveVar } from '@eventespresso/data';

import { EntityMetaMap, ManageEntityMeta } from './types';

type MEM = ManageEntityMeta;

export const useEntityMeta = (metaReactiveVar: ReactiveVar<EntityMetaMap>): MEM => {
	const metaMap = useReactiveVar(metaReactiveVar);

	const getMetaValue = useCallback<MEM['getMetaValue']>(
		(entityId, metaKey, defaultValue) => {
			return metaReactiveVar()?.[entityId]?.[metaKey] || defaultValue;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[metaReactiveVar, metaMap]
	);

	const setMetaValue = useCallback<MEM['setMetaValue']>(
		(entityId, metaKey, metaValue) => {
			const newMetaMap = assocPath([entityId, metaKey], metaValue, metaReactiveVar());
			metaReactiveVar(newMetaMap);
		},
		[metaReactiveVar]
	);

	const deleteMeta = useCallback<MEM['deleteMeta']>(
		(entityId, metaKey) => {
			const newMetaMap = dissocPath<EntityMetaMap>([entityId, metaKey], metaReactiveVar());
			metaReactiveVar(newMetaMap);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[metaReactiveVar, metaMap]
	);

	const getEntityMeta = useCallback<MEM['getEntityMeta']>(
		(entityId) => {
			return metaReactiveVar()?.[entityId];
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[metaMap]
	);

	const setEntityMeta = useCallback<MEM['setEntityMeta']>(
		(entityId, entityMeta) => {
			const newMetaMap = assocPath([entityId], entityMeta, metaReactiveVar());
			metaReactiveVar(newMetaMap);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[metaReactiveVar, metaMap]
	);

	const deleteEntityMeta = useCallback<MEM['deleteEntityMeta']>(
		(entityId) => {
			const newMetaMap = dissocPath<EntityMetaMap>([entityId], metaReactiveVar());
			metaReactiveVar(newMetaMap);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[metaReactiveVar, metaMap]
	);

	const getMetaMap = useCallback<MEM['getMetaMap']>(() => metaMap, [metaMap]);

	const resetMetaMap = useCallback<MEM['resetMetaMap']>(
		(newMetaMap) => {
			metaReactiveVar(newMetaMap);
		},
		[metaReactiveVar]
	);

	const mergeMetaMap = useCallback<MEM['mergeMetaMap']>(
		(newMetaMap) => {
			const mergedMetaMap = mergeDeepRight(metaReactiveVar(), newMetaMap);

			metaReactiveVar(mergedMetaMap);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[metaReactiveVar, metaMap]
	);

	return useMemo(
		() => ({
			deleteEntityMeta,
			deleteMeta,
			getEntityMeta,
			getMetaMap,
			getMetaValue,
			mergeMetaMap,
			resetMetaMap,
			setEntityMeta,
			setMetaValue,
		}),
		[
			deleteEntityMeta,
			deleteMeta,
			getEntityMeta,
			getMetaMap,
			getMetaValue,
			mergeMetaMap,
			resetMetaMap,
			setEntityMeta,
			setMetaValue,
		]
	);
};
