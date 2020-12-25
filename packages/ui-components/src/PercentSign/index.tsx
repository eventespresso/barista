import classNames from 'classnames';
import { __ } from '@eventespresso/i18n';

type Props = {
	className?: string;
};

export const PercentSign: React.FC<Props> = (props) => {
	const className = classNames('ee-percent-sign', props.className);
	return <div className={className}>{__('%')}</div>;
};
