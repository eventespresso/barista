import React, { memo } from 'react';
import { __ } from '@eventespresso/i18n';

import { Button, ButtonProps, ButtonType } from '../../../';
import { ChevronDoubleRight, ChevronRight } from '@eventespresso/icons';

interface Props extends ButtonProps {
	skippable?: boolean;
}

const Next: React.FC<Props> = ({ isDisabled, onClick, skippable, ...props }) => {
	const buttonText = props.buttonText || __('Next');
	const buttonType = props.buttonType || ButtonType.PRIMARY;
	const rightIcon = memo(() => (skippable ? <ChevronDoubleRight size='smaller' /> : <ChevronRight size='smaller' />));

	return (
		<Button
			buttonText={buttonText}
			buttonType={buttonType}
			isDisabled={isDisabled}
			onClick={onClick}
			rightIcon={rightIcon}
		/>
	);
};

export default memo(Next);
