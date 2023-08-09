class DateFactory {
	private base: string;

	private _minutes?: number;
	private _hours?: number;
	private _days?: number;
	private _months?: number;

	constructor() {
		// if you decide to change base, keep in mind that there is code that is rendered by PHP (see WpEnv for implementation details)
		this.base = this.getBase();
	}

	/**
	 * Always return 15th of the current month to avoid dealing with unexpected issues like today become yesterday when running E2E test on the last day of the months on the last hour
	 */
	private getBase(): string {
		const today = new Date();
		// we want *local* time to 15th 00:00:00 hence we are using UTC
		// https://stackoverflow.com/a/32648115/4343719
		// if timezone will become an issue, it can be addressed by
		//   - adjusting PlayWright config (client-side)
		//   - adjusting Docker container timezone (server-side)
		today.setUTCDate(15);
		today.setUTCHours(0, 0, 0, 0);
		return today.toISOString(); // ISO 8601 format
	}

	public minutes(minutes: number): DateFactory {
		this._minutes = minutes;
		return this;
	}

	public hours(hours: number): DateFactory {
		this._hours = hours;
		return this;
	}

	public days(days: number): DateFactory {
		this._days = days;
		return this;
	}

	public months(months: number): DateFactory {
		this._months = months;
		return this;
	}

	public make(): Date {
		const date = new Date(this.base);
		if (this._minutes) {
			date.setMinutes(date.getMinutes() + this._minutes);
			delete this._minutes;
		}
		if (this._hours) {
			date.setHours(date.getHours() + this._hours);
			delete this._hours;
		}
		if (this._days) {
			date.setDate(date.getDate() + this._days);
			delete this._days;
		}
		if (this._months) {
			date.setMonth(date.getMonth() + this._months);
			delete this._months;
		}
		return date;
	}
}

export { DateFactory };
