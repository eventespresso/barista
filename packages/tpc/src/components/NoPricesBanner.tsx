import { __, sprintf } from '@eventespresso/i18n';

import { Banner } from '@eventespresso/ui-components';
import { createInterpolateElement } from '@eventespresso/utils';

import AddDefaultPricesButton from './AddDefaultPricesButton';
import PricingAdminLink from './PricingAdminLink';

import type { TicketPriceCalculatorProps } from './TicketPriceCalculator';

interface Props extends Pick<TicketPriceCalculatorProps, 'context'> {}

const NoPricesBanner: React.FC<Props> = ({ context }) => {
	const title = __('This Ticket is Currently Free');

	const message = (
		<>
			{createInterpolateElement(
				sprintf(
					/* translators: %s default prices */
					__('Click the button below to load your %s into the calculator.'),
					'<PricingAdminLink>' + __('default prices') + '</PricingAdminLink>'
				),
				{
					PricingAdminLink: <PricingAdminLink />,
				}
			)}
			<br />
			{__('Additional ticket price modifiers can be added or removed.')}
			{context === 'editTicketForm' &&
				__('Click the save button below to assign which dates this ticket will be available for purchase on.')}
			<br />
			<AddDefaultPricesButton />
		</>
	);

	return <Banner status='info' title={title} message={message} />;
};

export default NoPricesBanner;
