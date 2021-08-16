import type { EntityMetaMap } from '@eventespresso/services';

export type ticketMeta = EntityMetaMap;

export type CapabilityOptions = {
	[optgroup: string]: {
		[capability: string]: string; // label
	};
};

export interface WpUserData {
	capabilityOptions?: CapabilityOptions;
	ticketMeta?: ticketMeta;
}
