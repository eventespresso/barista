import React from 'react';
import { __ } from '@wordpress/i18n';

import { Steps, Step } from '@eventespresso/adapters';
import { PrevNext } from '@eventespresso/services';
import { Calendar, Ticket } from '@eventespresso/icons';

const DatetimeFormSteps: React.FC<Pick<PrevNext, 'current'>> = ({ current }) => {
	return (
		<Steps current={current} showStepNumber>
			<Step description={__('primary information about the date')} icon={Calendar} title={__('Date Details')} />
			<Step description={__('relations between tickets and dates')} icon={Ticket} title={__('Assign Tickets')} />
		</Steps>
	);
};

export default DatetimeFormSteps;
