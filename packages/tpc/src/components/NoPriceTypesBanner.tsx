import { __, sprintf } from '@eventespresso/i18n';
import { Banner } from '@eventespresso/ui-components';
import { createInterpolateElement } from '@eventespresso/utils';

import PricingAdminLink from './PricingAdminLink';

const NoPriceTypesBanner = () => {
	// there should ALWAYS be a base price type as that one can not be deleted,
	// so if there is more than one price type, then we know that there is at least one price modifier
	const message = (
		<>
			{__('One or more price types are missing. Maybe they were placed in the trash?')}
			<br />
			{createInterpolateElement(
				sprintf(
					/* translators: %s link to price types admin */
					__('Go to the%sto restore (untrash) your price types and/or create some new ones.'),
					'<PricingAdminLink>' + __('price types admin page') + '</PricingAdminLink>'
				),
				{
					PricingAdminLink: <PricingAdminLink action='price_types' />,
				}
			)}
		</>
	);
	return <Banner status='warning' title={__('Missing Price Types!')} message={message} />;
};

export default NoPriceTypesBanner;
