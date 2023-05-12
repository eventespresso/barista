import { __ } from '@eventespresso/i18n';

import useConfirmWithButton from './useConfirmWithButton';
import type { ConfirmPropsWithButton } from './types';

const ConfirmClose: React.FC<ConfirmPropsWithButton> = (props) => {
	const message = __('Changes will be lost if you proceed.');
	const title = props.title || __('Are you sure you want to close this?');
	const yesButtonText = __('Yes, discard changes');
	const confirm = useConfirmWithButton({ ...props, message, title, yesButtonText });

	return confirm;
};

export default ConfirmClose;
