import type { InlineEditProps } from '@eventespresso/adapters';
import type { SelectProps, SwitchProps } from '@eventespresso/ui-components';
import type { Event, EventManager } from '@eventespresso/edtr-services';

type PickedProps =
	| 'allowDonations'
	| 'altRegPage'
	| 'defaultRegStatus'
	| 'displayTicketSelector'
	| 'phoneNumber'
	| 'status';

export interface EventRegistrationOptionsProps extends Pick<Event, PickedProps> {
	eventManagers: EventManager[];
	managerId: Event['manager']['id'];
	maxReg: Event['maxRegistrations'];
	onAltRegPageChange: InlineEditProps['onChange'];
	onDefaultRegStatusChange: InlineEditProps['onChange'];
	onDonationsChange: SwitchProps['onChangeValue'];
	onManagerChange: SelectProps['onChangeValue'];
	onMaxRegChange: InlineEditProps['onChange'];
	onPhoneNumberChange: InlineEditProps['onChange'];
	onStatusChange: InlineEditProps['onChange'];
	onTicketSelectorChange: SwitchProps['onChangeValue'];
}
export interface WrapperProps {
	children?: JSX.Element;
	className?: string;
	id?: string;
	label?: string;
	header?: string;
}
