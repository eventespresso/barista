export {};

export interface IEvent {
	allDay: boolean;
	className: string;
	color: string;
	venue: string;
	description: string;
	end: Date;
	eventType: string;
	event_days: number;
	image?: string;
	id: number;
	start: Date;
	textColor: string;
	title: string;
	url: string;
}
