import classnames from 'classnames';

import { Groups } from '@eventespresso/icons';

import { Link } from '../../..';

import './style.scss';

const RegistrationsLink: React.FC<React.ComponentProps<typeof Link>> = ({ href, children, ...props }) => {
	const className = classnames('ee-editor-details-reg-url-link', props.className);

	return (
		<Link {...props} className={className} href={href}>
			{children || <Groups />}
		</Link>
	);
};

export default RegistrationsLink;
