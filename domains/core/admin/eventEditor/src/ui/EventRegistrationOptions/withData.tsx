import { useCallback } from 'react';

import { useEvent, useEventManagers, useEventMutator } from '@eventespresso/edtr-services';
import type { InlineEditType as InlineEdit, SwitchProps } from '@eventespresso/adapters';
import type { EventRegistrationOptionsProps } from './types';

type InlineEditProps = InlineEdit.Component.Props;

const withData = <P extends Record<string, any>>(
	WrappedComponent: React.ComponentType<EventRegistrationOptionsProps>
): React.ComponentType<P> => {
	const WithData: React.FC<P> = () => {
		const event = useEvent();
		const eventManagers = useEventManagers();

		const { updateEntity: updateEvent } = useEventMutator(event?.id);

		const onAltRegPageChange = useCallback<InlineEditProps['onChange']>(
			(newAltRegPage) => {
				if (newAltRegPage !== event?.altRegPage) {
					updateEvent({ altRegPage: newAltRegPage });
				}
			},
			[event?.altRegPage, updateEvent]
		);

		const onDonationsChange = useCallback<SwitchProps['onChangeValue']>(
			(allowDonations) => {
				if (event?.allowDonations !== allowDonations) {
					updateEvent({ allowDonations });
				}
			},
			[event?.allowDonations, updateEvent]
		);

		const onDefaultRegStatusChange = useCallback<InlineEditProps['onChange']>(
			(defaultRegStatus) => {
				if (event?.defaultRegStatus !== defaultRegStatus) {
					updateEvent({ defaultRegStatus });
				}
			},
			[event?.defaultRegStatus, updateEvent]
		);

		const onManagerChange = useCallback(
			(newManagerId): void => {
				if (newManagerId !== event?.manager?.id) {
					updateEvent({ manager: newManagerId }); // TODO - check this mutation because manager is an object with properties id and name
				}
			},
			[event?.manager?.id, updateEvent]
		);

		const onMaxRegChange = useCallback<InlineEditProps['onChange']>(
			(newMaxRegistrations) => {
				const maxRegistrations = Number(newMaxRegistrations);
				if (maxRegistrations !== event?.maxRegistrations) {
					updateEvent({ maxRegistrations });
				}
			},
			[event?.maxRegistrations, updateEvent]
		);

		const onPhoneNumberChange = useCallback<InlineEditProps['onChange']>(
			(newPhoneNumber) => {
				if (newPhoneNumber !== event?.phoneNumber) {
					updateEvent({ phoneNumber: newPhoneNumber });
				}
			},
			[event?.phoneNumber, updateEvent]
		);

		const onStatusChange = useCallback<InlineEditProps['onChange']>(
			(status) => {
				if (status !== event?.status) {
					updateEvent({ status });
				}
			},
			[event?.status, updateEvent]
		);

		const onTicketSelectorChange = useCallback<SwitchProps['onChangeValue']>(
			(displayTicketSelector) => {
				if (event?.displayTicketSelector !== displayTicketSelector) {
					updateEvent({ displayTicketSelector });
				}
			},
			[event?.displayTicketSelector, updateEvent]
		);

		return (
			<WrappedComponent
				allowDonations={event?.allowDonations}
				altRegPage={event?.altRegPage}
				defaultRegStatus={event?.defaultRegStatus}
				displayTicketSelector={event?.displayTicketSelector}
				eventManagers={eventManagers}
				managerId={event?.manager?.id}
				maxReg={event?.maxRegistrations}
				onAltRegPageChange={onAltRegPageChange}
				onDefaultRegStatusChange={onDefaultRegStatusChange}
				onDonationsChange={onDonationsChange}
				onManagerChange={onManagerChange}
				onMaxRegChange={onMaxRegChange}
				onPhoneNumberChange={onPhoneNumberChange}
				onStatusChange={onStatusChange}
				onTicketSelectorChange={onTicketSelectorChange}
				phoneNumber={event?.phoneNumber}
				status={event?.status}
			/>
		);
	};

	return WithData;
};

export default withData;
