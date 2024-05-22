import type { InlineEditType as InlineEdit } from '@eventespresso/adapters';
import type { SelectProps, SwitchProps } from '@eventespresso/ui-components';
import type { Event, EventManager } from '@eventespresso/edtr-services';

type EventProps = Pick<
	Event,
	'allowDonations' | 'altRegPage' | 'defaultRegStatus' | 'displayTicketSelector' | 'phoneNumber' | 'status'
>;

export interface EventRegistrationOptionsProps extends EventProps {
	eventManagers: EventManager[];
	managerId: Event['manager']['id'];
	maxReg: Event['maxRegistrations'];
	onAltRegPageChange: InlineEdit.Component.Props['container']['onChange'];
	onDefaultRegStatusChange: InlineEdit.Component.Props['container']['onChange'];
	onDonationsChange: SwitchProps['onChangeValue'];
	onManagerChange: SelectProps['onChangeValue'];
	onMaxRegChange: InlineEdit.Component.Props['container']['onChange'];
	onPhoneNumberChange: InlineEdit.Component.Props['container']['onChange'];
	onStatusChange: InlineEdit.Component.Props['container']['onChange'];
	onTicketSelectorChange: SwitchProps['onChangeValue'];
}

export interface WrapperProps {
	children?: JSX.Element;
	className?: string;
	id?: string;
	label?: string;
	header?: string;
}
