import { ADMIN_ROUTES } from '@eventespresso/constants';
import { Link } from '@eventespresso/ui-components';
import { useConfig, getAdminUrl } from '@eventespresso/services';

const DefaultPricesLink: React.FC = ({ children }) => {
	const {
		siteUrl: { admin },
	} = useConfig();
	const href = getAdminUrl({ adminSiteUrl: admin, page: ADMIN_ROUTES.PRICES });

	return <Link href={href}>{children}</Link>;
};

export default DefaultPricesLink;
