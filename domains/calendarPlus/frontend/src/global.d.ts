import { IEvent } from './lib/types';

export {};

declare global {
	interface Window {
		calendarPlusData: IEvent[];
		calendarPlusSettings: any; //will replace type
	}
}
