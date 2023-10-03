import classNames from 'classnames';

import { RequiredIndicator, RequiredIndicatorProps } from '../RequiredIndicator';

import './style.scss';

export interface LabelProps extends RequiredIndicatorProps {
	hidden?: boolean;
	id?: string;
	label?: string;
	className?: string;
}

export const labelIDGenerator = (id: string) => `${id}-label`;

export const Label: React.FC<LabelProps> = ({ className, hidden = false, id, label, isRequired }) => {
	const labelID = labelIDGenerator(id);
	const labelClassName = classNames('ee-input-label', hidden && 'screen-reader-text', className);
	return (
		<label className={labelClassName} id={labelID} htmlFor={id}>
			{label}
			<RequiredIndicator isRequired={isRequired} />
		</label>
	);
};
