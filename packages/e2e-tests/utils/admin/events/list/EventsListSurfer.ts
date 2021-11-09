import { WPListTable, BulkActionsPosition } from '../../WPListTable';
import { ElementHandle } from '../../../../types';

export class EventsListSurfer extends WPListTable {
	/**
	 * Resets the list filters
	 */
	resetFilters = async (position?: BulkActionsPosition): Promise<void> => {
		const nav = await this.getTableNavWrapper(position);

		const resetLink = await nav.$('text="Reset Filters"');

		// hit the reset filters button and wait for the page load
		await Promise.all([page.waitForNavigation(), resetLink.click()]);
	};

	/**
	 * Get the name of an event from <tr /> handle
	 */
	getEventName = async (item: ElementHandle): Promise<string> => {
		return await (await item.$('td.column-name a.row-title')).innerText();
	};

	/**
	 * Check how many rows in a table
	 */
	tableRowsChecker = async () => {
		// count the number of results, discarding the no results row
		const tableRows = await this.getListItems();

		// check if there is rows contain 'no items found'
		const hasNoItems = await this.hasNoItems();
		// if hasNoItems is true, use it for count else get the table rows count length
		const count = hasNoItems ? 0 : tableRows.length;

		return { tableRows, count };
	};
}
