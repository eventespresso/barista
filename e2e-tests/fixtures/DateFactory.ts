class DateFactory {
	private base?: string;

	private _minutes?: number;
	private _hours?: number;
	private _days?: number;
	private _months?: number;

	constructor(base?: string) {
		this.base = base;
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
			this._minutes = undefined;
		}
		if (this._hours) {
			date.setHours(date.getHours() + this._hours);
			this._hours = undefined;
		}
		if (this._days) {
			date.setDate(date.getDate() + this._days);
			this._days = undefined;
		}
		if (this._months) {
			date.setMonth(date.getMonth() + this._months);
			this._months = undefined;
		}
		return date;
	}
}

export { DateFactory };
