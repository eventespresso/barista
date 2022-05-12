import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

import type { DissmissToast, SystemNotificationsToaster, ToastProps } from './types';
import toasterIcons from './toasterIcons';

const position = toast.POSITION.BOTTOM_RIGHT as 'bottom-right';
const className = 'ee-toaster-notice__toast';

const useSystemNotifications = (): SystemNotificationsToaster => {
	const dismiss: DissmissToast = useCallback((toastId) => toast.dismiss(toastId), []);

	const dissmissAll = useCallback((): void => {
		toast.dismiss();
	}, []);

	const error = useCallback(({ message, duration = 3000, ...props }) => {
		toast.success(message, {
			autoClose: duration,
			className,
			icon: toasterIcons['error'],
			position,
			...props,
		});
	}, []);

	const info = useCallback(({ message, duration = 12000, ...props }): void => {
		toast.success(message, {
			autoClose: duration,
			className,
			icon: toasterIcons['info'],
			position,
			...props,
		});
	}, []);

	const loading = useCallback(({ autoClose, key: toastId, message }: ToastProps): void => {
		toast.loading(message, {
			autoClose,
			className,
			icon: toasterIcons['loading'],
			position,
			toastId,
		});
	}, []);

	const success = useCallback(({ message, toastId, duration = 3000, ...props }): void => {
		toast.success(message, {
			autoClose: duration,
			className,
			icon: toasterIcons['success'],
			position,
			toastId,
			...props,
		});
	}, []);

	const update = useCallback(({ key, message, type, duration = 4000, ...props }): void => {
		toast.update(key, {
			autoClose: duration,
			isLoading: false,
			closeButton: true,
			render: message,
			icon: toasterIcons[type],
			type,
			...props,
		});
	}, []);

	const warning = useCallback(({ message, duration = 3000, ...props }): void => {
		toast.warn(message, {
			autoClose: duration,
			className,
			icon: toasterIcons['warning'],
			position,
			...props,
		});
	}, []);

	return useMemo(
		() => ({
			dismiss,
			dissmissAll,
			error,
			info,
			loading,
			success,
			update,
			warning,
		}),
		[dismiss, dissmissAll, error, info, loading, success, update, warning]
	);
};

export default useSystemNotifications;
