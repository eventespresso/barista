import { addDays, addHours } from 'date-fns';
export class DateFormatter {
	// "November 24, 2021 8:00 am" becomes "November 2021"
	static monthYearDateFromat = async (date: string) => {
		const intlOptions: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
		const startDate = Intl.DateTimeFormat('en-US', intlOptions).format(new Date(date.trim()));

		return startDate;
	};

	// format the date into something like "November 12, 2021 8:56 PM"
	static eventDateFormat = (date: Date): string => {
		// set the options for format
		const intlOptions: Intl.DateTimeFormatOptions = {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		};
		// format the date
		return Intl.DateTimeFormat('en-US', intlOptions).format(date);
	};

	// adding days and hours in todays date
	static addDaysAndHours = (date: Date, days: number, hours: number) => {
		const addDay = addDays(date, days);
		return this.eventDateFormat(addHours(addDay, hours));
	};
}
