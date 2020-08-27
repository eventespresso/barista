import React from 'react';
import { __, sprintf } from '@wordpress/i18n';

import { Banner } from '@eventespresso/components';
import { createInterpolateElement } from '@eventespresso/utils';
import AddDefaultPricesButton from './AddDefaultPricesButton';
import DefaultPricesLink from './DefaultPricesLink';

import type { TicketPriceCalculatorProps } from '../TicketPriceCalculator';

interface Props extends Pick<TicketPriceCalculatorProps, 'context'> {}

const NoPricesBanner: React.FC<Props> = ({ context }) => {
	const title = __('This Ticket is Currently Free');

	return (
		<Banner status='info' title={title}>
			<p>
				{createInterpolateElement(
					sprintf(
						/* translators: %s default prices */
						__('Click the button below to load your %s into the calculator.'),
						'<DefaultPricesLink>' + __('default prices') + '</DefaultPricesLink>'
					),
					{
						DefaultPricesLink: <DefaultPricesLink />,
					}
				)}
			</p>
			<p>{__('Additional ticket price modifiers can be added or removed.')}</p>
			{context === 'editTicketForm' && (
				<p>
					{__(
						'Click the save button below to assign which dates this ticket will be available for purchase on.'
					)}
				</p>
			)}
			<AddDefaultPricesButton />
		</Banner>
	);
};

export default NoPricesBanner;
