import classNames from 'classnames';
import { __ } from '@eventespresso/i18n';

import { Button, IconButton } from '../Button';
import { iconBtnClassName } from '../Button/IconButton';
import useConfirmationDialog from './useConfirmationDialog';
import type { ConfirmPropsWithButton } from './types';

const useConfirmWithButton: React.FC<ConfirmPropsWithButton> = ({ buttonProps, asIconButton, ...props }) => {
	const message = props.message || __('Changes will be lost if you proceed.');
	const title = props.title || __('Please confirm this action.');
	const { confirmationDialog, onOpen } = useConfirmationDialog({ ...props, message, title });
	const btnClassName = classNames(!asIconButton && buttonProps.icon && iconBtnClassName, buttonProps.className);

	const Component = asIconButton ? IconButton : Button;

	return (
		<>
			<Component {...buttonProps} className={btnClassName} onClick={onOpen} />
			{confirmationDialog}
		</>
	);
};

export default useConfirmWithButton;
