import { ContextProvider } from './ContextProvider';

const withContext = <P extends Record<string, any>>(Component: React.ComponentType<P>): React.FC<P> => {
	const WrappedComponent: React.FC<P> = (props) => {
		return (
			<ContextProvider>
				<Component {...props} />
			</ContextProvider>
		);
	};

	return WrappedComponent;
};

export default withContext;
