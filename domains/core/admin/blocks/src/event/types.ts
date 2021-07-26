import type { CSSProperties } from 'react';
import { BlockEditProps } from '@wordpress/blocks';

import type { EntityId, Entity } from '@eventespresso/data';

import { Event } from '@blocksServices/apollo';

export type EventField = Exclude<keyof Event, keyof Entity>;

export interface EventFieldAttributes {
	event: EntityId;
	field: EventField;
	style: CSSProperties;
}

export type EventFieldEditProps = BlockEditProps<EventFieldAttributes>;
