import useCurrentUserCan from './useCurrentUserCan';
import { CurrentUserCanHOC } from './types';

export const withCurrentUserCan: CurrentUserCanHOC = (capability, entityType, entity) => (Component) => {
	const WrappedComponent = (props) => {
		const currentUserCan = useCurrentUserCan();
		const hasPermission = currentUserCan(capability, entityType, entity);
		return hasPermission ? <Component {...props} /> : null;
	};

	return WrappedComponent;
};
