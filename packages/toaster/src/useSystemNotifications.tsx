import { useCallback, useMemo } from 'react';
import { cssTransition, toast } from 'react-toastify';

import toasterIcons from './toasterIcons';
import 'animate.css/animate.min.css';
import './style.scss';

import type { DissmissToast, SystemNotificationsToaster, ToastProps, UpdateToast } from './types';

const position = toast.POSITION.BOTTOM_RIGHT as 'bottom-right';
const theme = 'light'; // light   dark   colored

const transition = cssTransition({
	enter: 'animate__animated animate__bounceInRight',
	exit: 'animate__animated animate__bounceOutRight',
});
const updateTransition = cssTransition({
	enter: 'animate__animated animate__flipInX',
	exit: 'animate__animated animate__bounceOutRight',
});

const useSystemNotifications = (): SystemNotificationsToaster => {
	const dismiss: DissmissToast = useCallback((toastId) => toast.dismiss(toastId), []);

	const dissmissAll = useCallback((): void => {
		toast.dismiss();
	}, []);

	const error = useCallback(({ message, ...props }) => {
		toast.error(message, {
			autoClose: false,
			position,
			...props,
			theme,
			...props,
			icon: toasterIcons['error'],
			transition,
		});
	}, []);

	const info = useCallback(({ message, ...props }): void => {
		toast.info(message, {
			autoClose: 10000,
			position,
			...props,
			theme,
			...props,
			icon: toasterIcons['info'],
			transition,
		});
	}, []);

	const loading = useCallback(({ key: toastId, message }: ToastProps): void => {
		toast.loading(message, {
			autoClose: false,
			icon: toasterIcons['loading'],
			isLoading: true,
			position,
			theme,
			toastId,
			transition,
		});
	}, []);

	const success = useCallback(({ message, toastId, ...props }): void => {
		toast.success(message, {
			position,
			theme,
			toastId,
			...props,
			icon: toasterIcons['success'],
			transition,
		});
	}, []);

	const update: UpdateToast = useCallback(({ key, message, type, ...props }): void => {
		toast.update(key, {
			autoClose: 1500,
			icon: toasterIcons[type],
			isLoading: false,
			render: message,
			theme,
			transition: updateTransition,
			type,
			...props,
		});
	}, []);

	const warning = useCallback(({ message, ...props }): void => {
		toast.warning(message, {
			autoClose: false,
			position,
			theme,
			...props,
			icon: toasterIcons['warning'],
			transition,
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
