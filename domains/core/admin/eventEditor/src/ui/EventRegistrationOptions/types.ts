import type { InlineEditType as InlineEdit } from '@eventespresso/adapters';
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
	onAltRegPageChange: InlineEdit.Component.Props['onChange'];
	onDefaultRegStatusChange: InlineEdit.Component.Props['onChange'];
	onDonationsChange: SwitchProps['onChangeValue'];
	onManagerChange: SelectProps['onChangeValue'];
	onMaxRegChange: InlineEdit.Component.Props['onChange'];
	onPhoneNumberChange: InlineEdit.Component.Props['onChange'];
	onStatusChange: InlineEdit.Component.Props['onChange'];
	onTicketSelectorChange: SwitchProps['onChangeValue'];
}

export interface WrapperProps {
	children?: JSX.Element;
	className?: string;
	id?: string;
	label?: string;
	header?: string;
}
