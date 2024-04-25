import { BlockEditProps } from '@wordpress/blocks';
import type { AttendeesOrderByFields, EntityId, Order, RegistrationStatus } from '@eventespresso/data';

// TODO: consolidate data types
export interface EventAttendeesAttributes {
	event: EntityId;
	datetime: EntityId;
	ticket: EntityId;
	status: RegistrationStatus;
	limit: number;
	order: Order;
	orderBy: AttendeesOrderByFields | 'FIRST_THEN_LAST_NAME' | 'LAST_THEN_FIRST_NAME';
	showGravatar: boolean;
	avatarClass: string;
	avatarSize: number;
	displayOnArchives: boolean;
}

export type AttendeesEditProps = BlockEditProps<EventAttendeesAttributes>;
