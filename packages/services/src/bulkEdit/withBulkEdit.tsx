import { BulkEditProvider } from './BulkEditProvider';

export const withBulkEdit = <P extends Record<string, any>>(Component: React.ComponentType<P>): React.FC<P> => {
	const WrappedComponent: React.FC<P> = (props) => {
		return (
			<BulkEditProvider>
				<Component {...props} />
			</BulkEditProvider>
		);
	};

	return WrappedComponent;
};
