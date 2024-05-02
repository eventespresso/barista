import type { StartAndEndDate } from '..';
import type { Node, Venue } from '.';

export module Datetime {
	export interface Interface extends Node.Interface<'EspressoDatetime'>, Node.Trashable, StartAndEndDate.Type.String {
		capacity: number;
		description: string;
		isActive: boolean;
		isExpired: boolean;
		isPrimary: boolean;
		isSoldOut: boolean;
		isUpcoming: boolean;
		length: number;
		name: string;
		order: number;
		reserved: number;
		sold: number;
		status: Status;
		venue: Venue.Interface['id'];
	}

	export enum Status {
		soldOut = 'DTS',
		active = 'DTA',
		upcoming = 'DTU',
		postponed = 'DTP',
		cancelled = 'DTC',
		expired = 'DTE',
		inactive = 'DTI',
	}
}
