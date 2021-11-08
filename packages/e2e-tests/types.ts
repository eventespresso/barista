import type { ElementHandle as TElementHandle } from 'playwright-core';

export type EntityType = 'datetime' | 'ticket';

export type ElementHandle = TElementHandle<SVGElement | HTMLElement>;
