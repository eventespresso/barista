import React, { useCallback } from 'react';

import { __ } from '@eventespresso/i18n';
import { SwitchInput, SwitchInputProps } from '@eventespresso/components';
import { useEvent, useEventMutator } from '@eventespresso/edtr-services';

const EventMeta: React.FC = () => {
	const event = useEvent();
	const { updateEntity: updateEvent } = useEventMutator(event?.id);

	const onChangeDonations = useCallback<SwitchInputProps['onChangeValue']>(
		(allowDonations) => {
			updateEvent({ allowDonations });
		},
		[updateEvent]
	);

	const onChangeTicketSelector = useCallback<SwitchInputProps['onChangeValue']>(
		(displayTicketSelector) => {
			updateEvent({ displayTicketSelector });
		},
		[updateEvent]
	);

	return (
		<div>
			<h2>
				{__('Manager: ')}
				{event?.wpUser?.name}
			</h2>
			<SwitchInput
				label={__('Enable Donations')}
				isChecked={event?.allowDonations}
				onChangeValue={onChangeDonations}
			/>
			<SwitchInput
				label={__('Display Ticket Selector')}
				isChecked={event?.displayTicketSelector}
				onChangeValue={onChangeTicketSelector}
			/>
		</div>
	);
};

export default EventMeta;
