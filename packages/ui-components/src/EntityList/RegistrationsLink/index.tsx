import classnames from 'classnames';

import { __ } from '@eventespresso/i18n';
import { Groups } from '@eventespresso/icons';

import { TextLink } from '../../..';

import './style.scss';

const RegistrationsLink: React.FC<React.ComponentProps<typeof TextLink>> = ({ href, children, ...props }) => {
	const className = classnames('ee-editor-details-reg-url-link', !children && 'ee-icon-button', props.className);
	const tooltip = __('click to open the registrations admin page in a new tab or window');
	return (
		<TextLink {...props} className={className} href={href} tooltip={tooltip}>
			{children || <Groups />}
		</TextLink>
	);
};

export default RegistrationsLink;
