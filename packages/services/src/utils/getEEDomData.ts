import type { EventEspressoData } from '@eventespresso/types';

export function getEEDomData<Key extends keyof EventEspressoData>(key: Key): EventEspressoData[Key] {
	return window.eventEspressoData?.[key];
}
