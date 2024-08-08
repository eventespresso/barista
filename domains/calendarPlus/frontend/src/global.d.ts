import { IEvent } from './lib/types';

export {};

declare global {
	interface Window {
		calendarPlusData: IEvent[];
		calendarSettings: any; //will replace type
	}
}
