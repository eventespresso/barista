export module StartAndEndDate {
	export module Type {
		export type DateObject = Base<Date>;
		export type DateOrString = Base<Date | string>;
		export type String = Base<string>; // LATER: ISO string?
	}

	type Base<T extends any> = {
		startDate: T;
		endDate: T;
	};
}
