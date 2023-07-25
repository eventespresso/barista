import { Client } from '@eventespresso/e2e';
import { Input, Output } from './helper';

class Event {
	private event?: Output<'GET', 'Event'>;
	private datetimes: Output<'GET', 'Datetime'>[] = [];

	private parameters: {
		event?: Input<'POST', 'Event'>;
		datetimes: Input<'POST', 'Datetime'>[];
	} = { datetimes: [] };

	constructor(private readonly client: Client) {}

	public start(params: Input<'POST', 'Event'>): Event {
		this.parameters.event = params;
		return this;
	}

	public addDatetime(...params: Input<'POST', 'Datetime'>[]): Event {
		params.forEach(async (param) => {
			this.parameters.datetimes.push(param);
		});
		return this;
	}

	public async make(): Promise<void> {
		const event = await this.client.makeEntity('Event', this.parameters.event);
		this.event = event;
		if (this.parameters.datetimes.length > 0) {
			for (const param of this.parameters.datetimes) {
				if (!param.EVT_ID) {
					param.EVT_ID = this.event.EVT_ID;
				}
				const dt = await this.client.makeEntity('Datetime', param);
				this.datetimes.push(dt);
			}
		}
	}
}

export { Event };
