import { createContext, useMemo, useCallback, useState } from 'react';

import { without } from 'ramda';

import type { EntityId } from '@eventespresso/constants';

interface BulkEdit {
	addToSelected: (id: EntityId) => void;
	getSelected: () => Array<EntityId>;
	removeFromSelected: (id: EntityId) => void;
	selectMultiple: (ids: Array<EntityId>) => void;
	toggleSelected: (id: EntityId) => void;
	unSelectAll: VoidFunction;
	selected: Array<EntityId>;
}

const BulkEditContext = createContext<BulkEdit>(null);

const { Provider, Consumer: BulkEditConsumer } = BulkEditContext;

const BulkEditProvider: React.FC = ({ children }) => {
	const [state, setState] = useState<Array<EntityId>>([]);

	const addToSelected = useCallback<BulkEdit['addToSelected']>((id) => {
		setState((prevState) => [...prevState, id]);
	}, []);

	const getSelected = useCallback<BulkEdit['getSelected']>(() => state, [state]);

	const removeFromSelected = useCallback<BulkEdit['removeFromSelected']>((id) => {
		setState((prevState) => without([id], prevState));
	}, []);

	const toggleSelected = useCallback<BulkEdit['toggleSelected']>((id) => {
		setState((prevState) => (prevState.includes(id) ? without([id], prevState) : [...prevState, id]));
	}, []);

	const selectMultiple = useCallback<BulkEdit['selectMultiple']>((ids) => {
		setState((prevState) => [...prevState, ...ids]);
	}, []);

	const unSelectAll = useCallback<BulkEdit['unSelectAll']>(() => {
		setState([]);
	}, []);

	const value = useMemo(
		() => ({
			addToSelected,
			getSelected,
			removeFromSelected,
			selected: state,
			selectMultiple,
			toggleSelected,
			unSelectAll,
		}),
		[addToSelected, getSelected, removeFromSelected, selectMultiple, state, toggleSelected, unSelectAll]
	);

	return <Provider value={value}>{children}</Provider>;
};

export { BulkEditProvider, BulkEditConsumer, BulkEditContext };

export type { BulkEdit };
