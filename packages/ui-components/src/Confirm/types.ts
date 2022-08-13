import type { ButtonProps } from '../Button';
import { AlertType } from '../AlertDialog';

export interface ConfirmProps {
	addIconBG?: boolean;
	alertType?: AlertType;
	icon?: React.ComponentType<any>;
	message?: string;
	noButtonText?: string | React.ReactNode;
	onConfirm?: VoidFunction;
	onCancel?: VoidFunction;
	title?: string;
	yesButtonText?: string | React.ReactNode;
}

export interface ConfirmPropsWithButton extends ConfirmProps {
	asIconButton?: boolean;
	buttonProps: ButtonProps;
}
