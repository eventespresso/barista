import type { EntityMetaMap } from '@eventespresso/services';

export type ticketMeta = EntityMetaMap;

// LATER: consolidate data types
export type CapabilityOptions = {
	[optgroup: string]: {
		[capability: string]: string; // label
	};
};

// LATER: consolidate data types
export interface WpUserData {
	capabilityOptions?: CapabilityOptions;
	ticketMeta?: ticketMeta;
}
