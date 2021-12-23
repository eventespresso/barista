import { addDays, addHours, subDays, subHours } from 'date-fns';
import { NOW } from '@eventespresso/constants';
import { sub, add } from '@eventespresso/dates';
import { DateFormatter } from '@e2eUtils/admin';

export const data = [
	{
		name: '1',
		// This date is in the past
		startDate: sub('days', NOW, 40),
		endDate: sub('days', NOW, 38),
	},
	{
		name: '2',
		// This date is in the past
		startDate: sub('days', NOW, 10),
		endDate: sub('days', NOW, 9),
	},
	{
		name: '3',
		// This date is in the current month
		startDate: NOW,
		endDate: add('days', NOW, 2),
	},
	{
		name: '4',
		isTrashed: true,
	},
	{
		name: '5',
	},
	{
		name: '6',
	},
];

export const eventData = {
	// active events
	active: {
		title: 'Test active event',
		description: 'Some description for active event',
		status: 'ACTIVE',
		startDate: DateFormatter.eventDateFormat(subDays(NOW, 1)),
		endDate: DateFormatter.eventDateFormat(addDays(NOW, 1)),
	},

	todayOnly: {
		title: 'Test today event',
		description: 'Some description for today event',
		status: 'ACTIVE',
		startDate: DateFormatter.eventDateFormat(subHours(NOW, 2)),
		endDate: DateFormatter.eventDateFormat(addHours(NOW, 2)),
	},

	// expired events
	expired: {
		title: 'Test expired event',
		description: 'Some description for expired event',
		status: 'EXPIRED',
		startDate: DateFormatter.eventDateFormat(subDays(NOW, 20)),
		endDate: DateFormatter.eventDateFormat(subDays(NOW, 19)),
	},

	// upcoming events
	upcoming: {
		title: 'Test upcoming event',
		description: 'Some description for upcoming event',
		category: 'Sample category',
		status: 'PENDING',
		startDate: DateFormatter.eventDateFormat(addDays(NOW, 20)),
		endDate: DateFormatter.addDaysAndHours(NOW, 20, 2),
	},

	// data to use for multiple insertion of events like paginations and others
	bulkEventOne: { title: 'Test One', description: 'Some description for test one event' },
	bulkEventAnotherOne: { title: 'Test One', description: 'Some description for test one event' },
	bulkEventTwo: { title: 'Test Two', description: 'Some description for test two event' },
	bulkEventThree: { title: 'Test Three', description: 'Some description for test three event' },
	bulkEventFour: { title: 'Test Four', description: 'Some description for test four event' },
};

// data use create sample category
export const categoryData = {
	sample: { title: 'Sample category', description: 'Sample category description' },
};

// data use create sample category
export const defaultRegStatusOptions = {
	RAP: { value: 'RAP', text: 'Approved' },
	RNA: { value: 'RNA', text: 'Not Approved' },
	RPP: { value: 'RPP', text: 'Pending Payment' },
};

export const defaultSettingsData = {
	defaultRegStatusOptions: {
		RAP: { value: 'RAP', text: 'Approved' },
		RNA: { value: 'RNA', text: 'Not Approved' },
		RPP: { value: 'RPP', text: 'Pending Payment' },
	},
};
