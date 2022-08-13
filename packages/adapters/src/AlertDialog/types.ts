import type { AlertDialogProps as AlertDialogAdapterProps, AlertIconProps } from '@chakra-ui/react';

export enum AlertType {
	ACCENT = 'accent',
	DEFAULT = 'default',
	MINIMAL = 'minimal',
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

export interface AlertDialogProps extends Omit<AlertDialogAdapterProps, 'children'> {
	addIconBG?: boolean;
	alertType?: AlertType;
	body?: React.ReactNode;
	cancelButton: React.ReactNode;
	className?: string;
	dialogClassName?: string;
	header: React.ReactNode;
	icon?: React.ComponentType<any>;
	okButton: React.ReactNode;
}

export type { AlertIconProps };
