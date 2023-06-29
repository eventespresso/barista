import classNames from 'classnames';

import { Banner } from '../Banner';
import type { EmptyStateProps } from './types';

import './style.scss';

const EmptyState: React.FC<EmptyStateProps> = ({ message, title, ...props }) => {
	const className = classNames('ee-empty-state', props.className);

	return <Banner className={className} message={message} status='warning' title={title} variant='subtle' />;
};

export default EmptyState;
