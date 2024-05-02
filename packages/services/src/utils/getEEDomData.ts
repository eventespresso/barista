import type { EventEspressoData } from '@eventespresso/config';

export function getEEDomData<Key extends keyof EventEspressoData>(key: Key): EventEspressoData[Key] {
	return window.eventEspressoData?.[key];
}
