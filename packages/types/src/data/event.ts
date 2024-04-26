import type { Entity, User, Venue } from '.';

export module Event {
	export interface Interface extends Entity.Interface<'EspressoEvent'> {
		allowDonations: boolean;
		allowOverflow: boolean;
		altRegPage: string;
		created: string;
		defaultRegStatus: string;
		description: string;
		displayDescription: boolean;
		displayTicketSelector: boolean;
		isActive: boolean;
		isCancelled: boolean;
		isExpired: boolean;
		isInactive: boolean;
		isPostponed: boolean;
		isSoldOut: boolean;
		isUpcoming: boolean;
		manager?: User.EventManager;
		maxRegistrations: number;
		memberOnly: boolean;
		name: string;
		order: number;
		phoneNumber: string;
		shortDescription: string;
		status: string;
		timezoneString: string;
		venue: Venue.Interface['id'];
	}
}
