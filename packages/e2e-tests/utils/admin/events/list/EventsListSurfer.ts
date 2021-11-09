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
	 * Filter the event rows by name
	 */
	filterRowsByName = async (name: string): Promise<ElementHandle[]> => {
		const tableRows = await this.getListItems();
		const filteredRows = (
			await Promise.all(
				tableRows.map(async (row) => {
					const title = await this.getEventName(row);
					return title === name ? row : null;
				})
			)
		).filter(Boolean);

		return filteredRows;
	};
}
