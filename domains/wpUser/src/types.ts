import type { EntityMetaMap } from '@eventespresso/services';

export type ticketMeta = EntityMetaMap;

// TODO: consolidate data types
export type CapabilityOptions = {
	[optgroup: string]: {
		[capability: string]: string; // label
	};
};

// TODO: consolidate data types
export interface WpUserData {
	capabilityOptions?: CapabilityOptions;
	ticketMeta?: ticketMeta;
}
