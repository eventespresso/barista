import { Client } from '@eventespresso/e2e';
import { Event } from './Event';

class Factory {
	constructor(private readonly client: Client) {}

	public event(): Event {
		return new Event(this.client);
	}
}

export { Factory };
