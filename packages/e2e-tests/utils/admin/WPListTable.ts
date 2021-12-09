import { ElementHandle } from '../../types';

export type BulkActionsPosition = 'top' | 'bottom';

/**
 * This class helps you work with WP List table on admin pages
 */
export class WPListTable {
	tableSelector: string;

	constructor(tableSelector = '.wp-list-table') {
		this.tableSelector = tableSelector;
	}

	/**
	 * Reset instance data.
	 */
	reset(): void {
		this.tableSelector = '.wp-list-table';
	}

	/**
	 * Set the table class name
	 */
	setTableSelector = (tableSelector: string): WPListTable => {
		this.tableSelector = tableSelector;

		return this;
	};

	/**
	 * Get the handle for the <form /> that wraps the list table.
	 */
	getParentForm = async (): Promise<ElementHandle> => {
		return await page.$(`form:has(${this.tableSelector})`);
	};

	/**
	 * Get an instance of search form wrapper element
	 */
	getSearchForm = async (): Promise<ElementHandle> => {
		const form = await this.getParentForm();
		return await form.$('p.search-box');
	};

	/**
	 * Get an instance of search form input element
	 */
	getSearchFormInput = async (): Promise<ElementHandle> => {
		const searchForm = await this.getSearchForm();

		return await searchForm.$('input[type="search"]');
	};

	/**
	 * Get an instance of search form submit input element
	 */
	getSearchFormSubmit = async (): Promise<ElementHandle> => {
		const searchForm = await this.getSearchForm();

		return await searchForm.$('input[type="submit"]');
	};

	/**
	 * Fills in the search input and submits the form.
	 */
	searchFor = async (text: string) => {
		const input = await this.getSearchFormInput();

		await input.fill(text);

		const submit = await this.getSearchFormSubmit();

		// Click the search input
		await Promise.all([page.waitForNavigation(), submit.click()]);
	};

	/**
	 * Get an instance of table nav wrapper element
	 */
	getTableNavWrapper = async (position?: BulkActionsPosition): Promise<ElementHandle> => {
		const form = await this.getParentForm();
		return await form.$(`div.tablenav.${position || 'top'}`);
	};

	/**
	 * Get an instance of bulk actions wrapper element
	 */
	getBulkActionsWrapper = async (position?: BulkActionsPosition): Promise<ElementHandle> => {
		const nav = await this.getTableNavWrapper(position);
		return await nav.$('.bulkactions');
	};

	/**
	 * Select a given value in the bulk actions dropdown.
	 */
	selectBulkAction = async (
		option: Parameters<ElementHandle['selectOption']>[0],
		position?: BulkActionsPosition
	): Promise<void> => {
		const wrapper = await this.getBulkActionsWrapper(position);

		const select = await wrapper.$('select');

		await select.selectOption(option);
	};

	/**
	 * Applies the bulk actions
	 */
	applyBulkAction = async (position?: BulkActionsPosition): Promise<void> => {
		const wrapper = await this.getBulkActionsWrapper(position);

		const submit = await wrapper.$('input[type="submit"][value="Apply"]');

		await Promise.all([page.waitForNavigation(), submit.click()]);
	};

	/**
	 * Applies the selected filters
	 */
	applyFilters = async (position?: BulkActionsPosition): Promise<void> => {
		const wrapper = await this.getTableNavWrapper(position);

		const submit = await wrapper.$('input[type="submit"][value="Filter"]');

		await Promise.all([page.waitForNavigation(), submit.click()]);
	};

	/**
	 * Get the wrapper of view links element
	 */
	getViewLinksWrapper = async (): Promise<ElementHandle> => {
		return await page.$('ul.subsubsub');
	};

	/**
	 * Get URL for a view link by its text e.g. "Trash", "Draft"
	 */
	getViewLinkByText = async (text: string): Promise<string> => {
		const wrapper = await this.getViewLinksWrapper();

		const link = await wrapper.$(`li >> a:has-text("${text}")`);

		return await link.getAttribute('href');
	};

	/**
	 * Get the item count in the given view e.g. "Trash", "Draft"
	 */
	getViewCount = async (view: string): Promise<number> => {
		const wrapper = await this.getViewLinksWrapper();

		const li = await wrapper.$(`li:has-text("${view}")`);

		const count = await (await li.$('span.count')).innerText();

		// replace open and close parenthesis into empty string
		return Number(count.replace(/[()]/g, ''));
	};

	/**
	 * Goto a specific view by text e.g. "Trash", "Draft"
	 */
	goToView = async (text: string): Promise<void> => {
		const href = await this.getViewLinkByText(text);

		await Promise.all([page.waitForNavigation(), page.goto(href)]);
	};

	/**
	 * Get an instance of the <tr /> element inside <thead />
	 */
	getHeadRow = async (): Promise<ElementHandle> => {
		return await page.$(`${this.tableSelector} >> thead tr`);
	};

	/**
	 * Get a list of <tr /> elements inside <tbody />
	 */
	getListItems = async (): Promise<Array<ElementHandle>> => {
		return await page.$$(`${this.tableSelector} >> tbody tr`);
	};

	/**
	 * Get the first <tr /> element inside <tbody />
	 */
	getFirstListItem = async (): Promise<ElementHandle> => {
		const items = await this.getListItems();

		return items[0];
	};

	/**
	 * Get the action link for a list item give by text.
	 * Item can be one from the list returend by getListItems().
	 */
	getItemActionLinkByText = async (item: ElementHandle, text: string): Promise<string> => {
		const link = await item.$(`.row-actions >> a:has-text("${text}")`);
		return await link.getAttribute('href');
	};

	/**
	 * Whether the list is empty
	 */
	hasNoItems = async (): Promise<boolean> => {
		const items = await this.getListItems();

		return items.length === 1 && (await items[0].getAttribute('class')) === 'no-items';
	};

	/**
	 * the number of items in list
	 */
	getItemCount = async (excludeNoItemsFound = true): Promise<number> => {
		if ((await this.hasNoItems()) && excludeNoItemsFound) {
			return 0;
		}
		const items = await this.getListItems();
		return items.length;
	};

	/**
	 * go to specific link i.e. "Draft" or "View all events" etc. and count events
	 */
	goToViewAndCount = async (linkName: string): Promise<number> => {
		// go to this link first to count the event list
		await this.goToView(linkName);
		// count the event list inside the this link
		return await this.getViewCount(linkName);
	};

	/**
	 * Select all the items in the list
	 */
	selectAll = async () => {
		const head = await this.getHeadRow();

		const checkbox = await head.$('input[type="checkbox"][id="cb-select-all-1"]');

		await checkbox.check();
	};

	/**
	 * Trash the selected items in the list
	 */
	trashSelected = async () => {
		await this.selectBulkAction({ label: 'Move to Trash' });
		await this.applyBulkAction();
	};

	/**
	 * Trash all the items in the list
	 */
	trashAll = async (): Promise<void> => {
		await this.selectAll();
		await this.trashSelected();
	};

	/**
	 * Check the selected items in the list
	 */
	selectItemCheckbox = async (item: ElementHandle): Promise<void> => {
		const checkbox = await item.$('.check-column input[type="checkbox"]');
		await checkbox.check();
	};

	/**
	 * check all the event checkbox that is selected to delete permanently
	 */
	checkAllDeletePermanently = async () => {
		await page.check(
			'#eventespressoadmin-pageseventsform-sectionsconfirmeventdeletionform-events input[type="checkbox"]'
		);
	};

	/**
	 * check the confirmation checkbox for delete permanently
	 */
	checkConfirmDeletePermanently = async () => {
		await page.check('#eventespressoadmin-pageseventsform-sectionsconfirmeventdeletionform-backup-yes');
	};

	/**
	 * select delete permanently in bulk option
	 */
	selectDeletePermanently = async () => {
		await this.selectBulkAction({ label: 'Delete Permanently' });
		await this.applyBulkAction();
	};
}
