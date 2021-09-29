import { __ } from '@eventespresso/i18n';

import { Steps, Step } from '@eventespresso/ui-components';
import { PrevNext } from '@eventespresso/hooks';
import { Calculator, Ticket } from '@eventespresso/icons';

const TicketFormSteps: React.FC<Pick<PrevNext, 'current'>> = ({ current }) => {
	return (
		<Steps current={current} showStepNumber>
			<Step description={__('primary information about the ticket')} icon={Ticket} title={__('Ticket Details')} />
			<Step
				description={__('apply ticket price modifiers and taxes')}
				icon={Calculator}
				title={__('Price Calculator')}
			/>
		</Steps>
	);
};

export default TicketFormSteps;
