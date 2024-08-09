export interface IToastOptions {
	title: string;
	description?: string;
	duration?: number;
	isClosable?: boolean;
	position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface ICalendarPlusSettings {
	defaultView: string;
	monthView: boolean;
	weekView: boolean;
	dayView: boolean;
	agendaView: boolean;
}
