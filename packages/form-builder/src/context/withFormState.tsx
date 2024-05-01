import { FormStateProvider, FormStateProviderProps } from './FormStateProvider';

export const withFormState = <P extends Record<string, any>>(
	Component: React.ComponentType<P>
): React.ComponentType<P & FormStateProviderProps> => {
	return function WrappedComponent(props: P & FormStateProviderProps) {
		return (
			<FormStateProvider {...props}>
				<Component {...props} />
			</FormStateProvider>
		);
	};
};
