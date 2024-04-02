import { createContext } from 'react';

import { useMemoStringify } from '@eventespresso/utils';
import { DataStateManager, BaseProps } from '../types';
import { useDataStateManager } from '../data';

const DataStateContext = createContext<DataStateManager>(null);

const { Provider, Consumer: DataStateConsumer } = DataStateContext;

const DataStateProvider: React.FC<BaseProps> = ({ children, assignmentType, entity }) => {
	const props = useMemoStringify({ assignmentType, entity });
	const data = useDataStateManager(props);

	return <Provider value={data}>{children}</Provider>;
};

export { DataStateContext, DataStateProvider, DataStateConsumer };
