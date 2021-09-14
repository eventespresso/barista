import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

import type { DissmissToast, SystemNotificationsToaster, ToastProps, UpdateToast } from './types';
import { Toaster } from './Toaster';

const position = toast.POSITION.BOTTOM_RIGHT as 'bottom-right';
const className = 'ee-toaster-notice__toast';

const useSystemNotifications = (): SystemNotificationsToaster => {
	const dismiss: DissmissToast = useCallback((toastId) => toast.dismiss(toastId), []);

	const dissmissAll = useCallback((): void => {
		toast.dismiss();
	}, []);

	const error = useCallback(({ message }) => {
		toast(<Toaster message={message} type='error' />, {
			className,
			position,
		});
	}, []);

	const info = useCallback(({ message }): void => {
		toast(<Toaster message={message} type='info' />, {
			className,
			position,
		});
	}, []);

	const loading = useCallback(({ autoClose, key: toastId, message }: ToastProps): void => {
		toast(<Toaster message={message} type='loading' />, {
			autoClose,
			className,
			position,
			toastId,
		});
	}, []);

	const success = useCallback(({ message, toastId }): void => {
		toast(<Toaster message={message} type='success' />, {
			className,
			position,
			toastId,
		});
	}, []);

	const update = useCallback(({ key, message, type }): void => {
		toast(<Toaster message={message} type={type} />, {
			className,
			position,
		});
	}, []);

	const warning = useCallback(({ message }): void => {
		toast(<Toaster message={message} type='warning' />, {
			className,
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
