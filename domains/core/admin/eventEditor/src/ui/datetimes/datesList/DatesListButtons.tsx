import { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';

import { Ticket } from '@eventespresso/icons';
import { Button, ButtonRow } from '@eventespresso/ui-components';
import { USE_ADVANCED_EDITOR } from '@eventespresso/constants';
import { EdtrGlobalModals, useDatetimes, useTickets } from '@eventespresso/edtr-services';
import { useGlobalModal } from '@eventespresso/registry';
import { withCurrentUserCan } from '@eventespresso/services';

import { BaseProps } from '../../ticketAssignmentsManager';
import { NewDateButton } from './newDateOptions';

const DatesListButtons: React.FC = () => {
	const { openWithData } = useGlobalModal<BaseProps>(EdtrGlobalModals.TAM);

	const datetimes = useDatetimes();
	const tickets = useTickets();
	const isDisabled = !datetimes.length || !tickets.length;

	const tooltip = isDisabled && __('Add a date or a ticket in order to use Ticket Assignment Manager');

	const onOpen = useCallback(() => {
		openWithData({ assignmentType: 'forAll' });
	}, [openWithData]);

	return (
		<ButtonRow>
			<NewDateButton />
			<Button
				buttonText={__('Ticket Assignments')}
				icon={Ticket}
				isDisabled={isDisabled}
				onClick={onOpen}
				size='big'
				tooltip={tooltip}
			/>
		</ButtonRow>
	);
};

export default withCurrentUserCan(USE_ADVANCED_EDITOR)(DatesListButtons);
