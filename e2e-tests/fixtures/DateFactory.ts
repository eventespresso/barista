class DateFactory {
	private base: string;

	private _minutes?: number;
	private _hours?: number;
	private _days?: number;
	private _months?: number;

	constructor() {
		// if you decide to change base, keep in mind that there is code that is rendered by PHP (see WpEnv for implementation details)
		this.base = 'December 15 2042 13:37:00';
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
