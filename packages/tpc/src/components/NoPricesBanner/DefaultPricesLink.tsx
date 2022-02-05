import { ADMIN_ROUTES } from '@eventespresso/constants';
import { TextLink } from '@eventespresso/ui-components';
import { useConfig, getAdminUrl } from '@eventespresso/services';

const DefaultPricesLink: React.FC = ({ children }) => {
	const {
		siteUrl: { admin },
	} = useConfig();
	const href = getAdminUrl({ adminSiteUrl: admin, page: ADMIN_ROUTES.PRICES });

	return <TextLink href={href}>{children}</TextLink>;
};

export default DefaultPricesLink;
