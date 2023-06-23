import { ADMIN_ROUTES } from '@eventespresso/constants';
import { TextLink } from '@eventespresso/ui-components';
import { useConfig, getAdminUrl, AdminUrlProps } from '@eventespresso/services';

type Props = {
	action?: string;
};

const PricingAdminLink: React.FC<Props> = ({ children, action = '' }) => {
	const {
		siteUrl: { admin },
	} = useConfig();
	const params: AdminUrlProps = { adminSiteUrl: admin, page: ADMIN_ROUTES.PRICES, action: null };
	if (action !== '') {
		params.action = action;
	}
	const href = getAdminUrl(params);

	return <TextLink href={href}>{children}</TextLink>;
};

export default PricingAdminLink;
