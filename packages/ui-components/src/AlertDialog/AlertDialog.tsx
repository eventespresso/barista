import classNames from 'classnames';

import { AlertDialog as AlertDialogAdapter, AlertDialogProps, AlertType } from '@eventespresso/adapters';

import './styles.scss';

export { AlertType };

export const AlertDialog: React.FC<AlertDialogProps> = ({ addIconBG, alertType, className, ...props }) => {
	const dialogClassName = classNames(
		className,
		'ee-alert-dialog',
		addIconBG && 'ee-alert-dialog--icon-bg',
		alertType !== AlertType.DEFAULT && [`ee-alert-dialog--${alertType}`]
	);
	return <AlertDialogAdapter dialogClassName={dialogClassName} {...props} />;
};
