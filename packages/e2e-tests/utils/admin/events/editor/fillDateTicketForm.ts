import { formatDateTime } from '@e2eUtils/common';
import { CommonEntityFields, EntityEditor } from './EntityEditor';

const formatDate = formatDateTime();

export type DateTicketFormArgs = CommonEntityFields & {
	capacity?: string;
	quantity?: string;
};

export const fillDateTicketForm = async ({
	capacity,
	description,
	endDate,
	isTrashed,
	name,
	quantity,
	startDate,
}: DateTicketFormArgs) => {
	try {
		name && (await page.fill('input[aria-label="Name"]', name));

		if (description) {
			await page.click(EntityEditor.RTEContentSelector);
			await page.type(EntityEditor.RTEContentSelector, description);
		}

		if (startDate) {
			// Since date picker input looses focus to popover on initial focus
			// We need to focus twice
			await page.focus('input[aria-label="Start Date"]');
			await page.fill('input[aria-label="Start Date"]', await formatDate(startDate));
		}

		if (endDate) {
			await page.focus('input[aria-label="End Date"]');
			await page.fill('input[aria-label="End Date"]', await formatDate(endDate));
		}

		if (capacity) {
			await page.focus('[name="capacity"]');
			await page.fill('[name="capacity"]', capacity);
		}

		if (quantity) {
			await page.focus('[name="quantity"]');
			await page.fill('[name="quantity"]', quantity);
		}

		isTrashed !== undefined && (await page.click('label[for="isTrashed"]'));
	} catch (e) {
		console.log(e);
	}
};
