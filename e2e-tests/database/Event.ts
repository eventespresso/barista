import { Client } from '@eventespresso/e2e';
import { Input, Output } from './helper';

class Event {
	private _event?: Output<'GET', 'Event'>;
	private _datetimes: Output<'GET', 'Datetime'>[] = [];
	private _tickets: Output<'GET', 'Ticket'>[] = [];

	public get event(): Output<'GET', 'Event'> | undefined {
		return this._event;
	}

	public get datetimes(): Output<'GET', 'Datetime'>[] {
		return this._datetimes;
	}

	public get tickets(): Output<'GET', 'Ticket'>[] {
		return this._tickets;
	}

	constructor(private readonly client: Client) {}

	public async make(event: Input<'POST', 'Event'>): Promise<Event> {
		this._event = await this.client.makeEntity('Event', event);
		return this;
	}

	public async addDatetimes(...datetimes: Input<'POST', 'Datetime'>[]): Promise<Event> {
		if (!this._event) {
			throw new Error('You forgot call .make() method!');
		}
		for (const params of datetimes) {
			if (!params.EVT_ID) {
				params.EVT_ID = this._event.EVT_ID;
			}
			const datetime = await this.client.makeEntity('Datetime', params);
			this._datetimes.push(datetime);
		}
		return this;
	}

	public async addTickets(
		datetime?: Input<'GET', 'Datetime'>,
		...tickets: Input<'POST', 'Ticket'>[]
	): Promise<Event> {
		for (const params of tickets) {
			const ticket = await this.client.makeEntity('Ticket', params);
			this._tickets.push(ticket);
			if (datetime) {
				await this.client.linkEntity('Ticket', ticket, 'Datetime', datetime);
			}
		}
		return this;
	}
}

export { Event };
