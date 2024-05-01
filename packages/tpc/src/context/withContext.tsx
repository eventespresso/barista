import { ContextProvider } from './ContextProvider';
import type { WithContextProps } from './types';

const withContext = <P extends Record<string, any>>(
	Component: React.ComponentType<P>,
	contextProps: WithContextProps
): React.FC<P> => {
	const WrappedComponent: React.FC<P> = (props) => {
		return (
			<ContextProvider {...contextProps}>
				<Component {...props} />
			</ContextProvider>
		);
	};

	return WrappedComponent;
};

export default withContext;
