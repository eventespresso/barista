import { useEffect } from 'react';
import { sprintf } from '@wordpress/i18n';
import { ToastContainer } from 'react-toastify';
import { useSystemNotifications, initToaster } from '@eventespresso/toaster';

import useNotifications from './useNotifications';

const Notifications = (): JSX.Element => {
	const toaster = useSystemNotifications();
	const toasts = useNotifications();

	useEffect(() => {
		initToaster();
	}, []);

	useEffect(() => {
		toasts.dev.readyTypes.forEach((type) => {
			const message = sprintf('%s initialized', type);
			toaster.success({ message, toastId: message });
		});
	}, [toaster, toasts]);

	return <ToastContainer />;
};

export default Notifications;
