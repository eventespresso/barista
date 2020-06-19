import React from 'react';
import { __ } from '@wordpress/i18n';

import { Groups } from '@eventespresso/icons';
import { Link, LinkProps } from '../../../';

import './style.scss';

interface Props extends LinkProps {
	href: string;
}

const RegistrationsLink: React.FC<Props> = ({ href, ...props }) => {
	return (
		<Link
			className='ee-editor-details-reg-url-link'
			external
			href={href}
			icon={<Groups svgSize={24} />}
			{...props}
		/>
	);
};

export default React.memo(RegistrationsLink);
