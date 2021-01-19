import { useCallback, useMemo } from 'react';
import { __ } from '@eventespresso/i18n';

import { useDataState } from '../../../data';
import type { ButtonProps } from '@eventespresso/ui-components';

const useCancelButtonProps = (onCloseModal: VoidFunction, hasErrors?: boolean): ButtonProps => {
	const { hasOrphanEntities } = useDataState();
	const disabled = hasErrors !== undefined ? hasErrors : hasOrphanEntities();

	const onClick: ButtonProps['onClick'] = useCallback(() => {
		onCloseModal();
	}, [onCloseModal]);

	return useMemo<ButtonProps>(
		() => ({
			buttonText: __('Cancel'),
			isDisabled: disabled,
			onClick,
			type: 'reset',
		}),
		[disabled, onClick]
	);
};

export default useCancelButtonProps;
