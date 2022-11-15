import classNames from 'classnames';

import {
	InputWithLabel as InputWithLabelAdapter,
	InputWithLabelProps as InputWithLabelAdapterProps,
} from '@eventespresso/adapters';
import './style.scss';

export interface InputWithLabelProps extends InputWithLabelAdapterProps {
	className: string;
	disabled: boolean;
	label: React.ReactNode;
	labelPosition?: 'left' | 'right';
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
	children,
	className,
	disabled,
	label,
	labelPosition = 'right',
}) => {
	const leftLabel = labelPosition === 'left' && label;
	const leftLabelClassName = leftLabel && 'ee-input-with-label__left-label';

	const rightLabel = labelPosition === 'right' && label;
	const rightLabelClassName = rightLabel && 'ee-input-with-label__right-label';

	const htmlClassName = classNames(
		className && className,
		'ee-input-with-label',
		disabled && 'ee-input-with-label--disabled',
		leftLabelClassName,
		rightLabelClassName
	);

	return (
		<InputWithLabelAdapter className={htmlClassName} leftLabel={leftLabel} rightLabel={rightLabel}>
			{children}
		</InputWithLabelAdapter>
	);
};
