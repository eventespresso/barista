import type { AnyObject } from '@eventespresso/utils';
import usePermissions from './usePermissions';
import { Capability } from './types';

export const withPermission =
	(capability: Capability) =>
	<P extends AnyObject>(Component: React.FC<P>) => {
		const WrappedComponent: React.FC<P> = (props) => {
			const permissions = usePermissions();
			const hasPermission = permissions?.includes(capability);
			return hasPermission ? <Component {...props} /> : null;
		};

		return WrappedComponent;
	};
