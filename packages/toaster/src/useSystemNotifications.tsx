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

	const error = useCallback(({ message }) => {
		toast.success(message, {
			className,
			icon: toasterIcons['error'],
			position,
		});
	}, []);

	const info = useCallback(({ message }): void => {
		toast.success(message, {
			className,
			icon: toasterIcons['info'],
			position,
		});
	}, []);

	const loading = useCallback(({ autoClose, key: toastId, message }: ToastProps): void => {
		toast.loading(message, {
			autoClose,
			className,
			icon: toasterIcons['loading'],
			position,
			toastId
		});
	}, []);

	const success = useCallback(({ message, toastId }): void => {
		toast.success(message, {
			className,
			icon: toasterIcons['success'],
			position,
			toastId,
		});
	}, []);

	const update = useCallback(({ key, message, type }): void => {
		toast.update(key, {
			autoClose: 4000,
			render: message,
			icon: toasterIcons[type],
			type,
		});
	}, []);

	const warning = useCallback(({ message }): void => {
		toast.warn(message, {
			className,
			icon: toasterIcons['warning'],
			position,
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
