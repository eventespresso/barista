import type { Entity } from '.';

export module Venue {
	export interface Interface extends Entity.Interface<'EspressoVenue'> {
		capacity: number;
		description: string;
		googleMapLink: string;
		name: string;
		phone: string;
		shortDescription: string;
		thumbnail: string;
		url: string;
		address?: string;
		address2?: string;
		city?: string;
		country?: string;
		countryISO?: string;
		countryName?: string;
		state?: string;
		stateAbbrev?: string;
		stateName?: string;
		zip?: string;
	}
}
