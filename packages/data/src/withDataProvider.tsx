import { DataProvider } from './DataProvider';

export const withDataProvider = <P extends Record<string, any>>(Component: React.ComponentType<P>): React.FC<P> => {
	const WrappedComponent: React.FC<P> = (props) => {
		return (
			<DataProvider>
				<Component {...props} />
			</DataProvider>
		);
	};

	return WrappedComponent;
};
