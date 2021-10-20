import { clickButton } from '@e2eUtils/common';
import type { Page, ElementHandle, JSHandle } from 'playwright-core';

import { EntityType } from '../../../types';

export type ListView = 'card' | 'table';
export type Field = 'name' | 'dbId' | 'status';
export type Item = ElementHandle<SVGElement | HTMLElement>;

/**
 * This class helps you to parse an entity list and
 * get different information about the list.
 *
 * For example dates and tickets list.
 */
export class EntityListParser {
	entityType: EntityType;

	view: ListView;

	constructor(entityType?: EntityType, view: ListView = 'card') {
		this.entityType = entityType;
		this.view = view;
	}

	/**
	 * Reset instance data.
	 */
	reset(): void {
		this.entityType = undefined;
		this.view = 'card';
	}

	/**
	 * Change the current entity type in the instance.
	 */
	setEntityType = (entityType: EntityType): EntityListParser => {
		this.entityType = entityType || 'datetime';

		return this;
	};

	/**
	 * Change the current view in the instance.
	 */
	setView = (view: ListView): EntityListParser => {
		this.view = view;

		return this;
	};

	/**
	 * Switch the current view for the list as well as the instance.
	 */
	switchView = async (view: ListView): Promise<EntityListParser> => {
		this.setView(view);

		const currentView = await this.getCurrentView();

		if (currentView !== view) {
			const filterBar = await this.getFilterBar();

			const switchViewButton = await filterBar?.$(`[type=button] >> text=${view} view`);

			await switchViewButton?.click();

			// wait for the button to become active
			await page.waitForSelector(`button.ee-btn--is-active >> text="${view} view"`);

			const listSelector = view === 'card' ? '.ee-entity-list__card-view' : '.ee-entity-table';

			// wait for the list to lazy load
			await page.waitForSelector(listSelector);
		}

		return this;
	};

	/**
	 * Toggle the current view for the list as well as the instance.
	 */
	toggleView = async (): Promise<EntityListParser> => {
		const currentView = await this.getCurrentView();

		await this.switchView(currentView === 'card' ? 'table' : 'card');

		return this;
	};

	/**
	 * Retrieve the entity list root selector.
	 */
	getRootSelector = (): string => {
		return `#ee-entity-list-${this.entityType}s`;
	};

	/**
	 * Retrieve the entity ids container selector.
	 */
	getCacheIdsSelector = (): string => {
		return `${this.getRootSelector()} .ee-entity-list__footer .ee-entity-cache-ids`;
	};

	/**
	 * Retrieve the entity list element.
	 */
	getListRoot = async (): ReturnType<Page['$']> => {
		return await page.$(this.getRootSelector());
	};

	/**
	 * Retrieve the entity filter bar element.
	 */
	getFilterBar = async (): ReturnType<ElementHandle['$']> => {
		const entityList = await this.getListRoot();

		return entityList?.$('.ee-filter-bar');
	};

	/**
	 * Retrieve the entity filter tags wrapper element.
	 */
	getFilterTags = async (): ReturnType<ElementHandle['$']> => {
		const entityList = await this.getListRoot();

		return entityList?.$('.ee-filter-tags');
	};

	/**
	 * Get the current list view - card|table
	 */
	getCurrentView = async (): Promise<ListView> => {
		const filterBar = await this.getFilterBar();

		// Use * to match the button, instead of the child span
		const tableViewButton = await filterBar?.$('*css=button >> text=table view');

		const className = await tableViewButton.getAttribute('class');

		// If table view button has "is-active" class
		const isTableViewActive = className.includes('is-active');

		return isTableViewActive ? 'table' : 'card';
	};

	/**
	 * Retrieve the entity items wrapper based on the current view.
	 */
	getItemsListWrapper = async (): ReturnType<ElementHandle['$']> => {
		return this.view === 'card' ? this.getCardList() : this.getTableList();
	};

	/**
	 * Retrieve the entity card view list wrapper element.
	 */
	getCardList = async (): ReturnType<ElementHandle['$']> => {
		const entityList = await this.getListRoot();

		return entityList?.$('.ee-entity-list__card-view');
	};

	/**
	 * Retrieve the entity table view list wrapper element.
	 */
	getTableList = async (): ReturnType<ElementHandle['$']> => {
		const entityList = await this.getListRoot();

		return entityList?.$('.ee-entity-table tbody');
	};

	/**
	 * Retrieve an array of items in the list.
	 */
	getListItems = async (): ReturnType<ElementHandle['$$']> => {
		const list = await this.getItemsListWrapper();

		const items = (await list?.$$('.ee-entity-list-item')) || [];

		return items;
	};

	/**
	 * Retrieve an item/element from the entity list.
	 * If no dbId is provided, first item will be returned.
	 */
	getItem = async (dbId?: number): ReturnType<ElementHandle['$']> => {
		if (dbId) {
			return await this.getItemBy('dbId', dbId);
		}

		const items = await this.getListItems();

		// no dbId is supplied, lets return the first item, if present
		return items?.[0];
	};

	/**
	 * Retrieve an item/element from the entity list by the given field value.
	 */
	getItemBy = async (field: Field, value: string | number): ReturnType<ElementHandle['$']> => {
		const items = await this.getListItems();

		if (items.length && field && value) {
			// We can't use items.find(), because it doesn't accept promises
			for (const item of items) {
				const fieldValue = await this.getItemField(item, field);

				if (fieldValue === value) {
					return item;
				}
			}
		}
		return null;
	};

	/**
	 * Retrieve an item/element from the entity list by the given posision, starting from 1.
	 */
	getNthItem = async (position: number): ReturnType<ElementHandle['$']> => {
		const items = await this.getListItems();

		return items[position - 1];
	};

	/**
	 * Retrieve the field value of an item/element.
	 */
	getItemField = async (item: Item, field: Field): Promise<string | number> => {
		switch (field) {
			case 'dbId':
				return this.getItemDbId(item);

			case 'name':
				return this.getItemName(item);

			case 'status':
				return this.getItemStatus(item);
		}

		return null;
	};

	/**
	 * Retrieve the dbId of an item/element. Default to first item.
	 */
	getItemDbId = async (item?: Item): Promise<number> => {
		const targetItem = item || (await this.getItem());
		let dbIdStr: string;

		if (this.view === 'card') {
			dbIdStr = await targetItem?.$eval('.ee-entity-ids .ee-entity-dbid', (e) => e.textContent);
		} else {
			dbIdStr = await targetItem?.$eval('td.ee-col-1', (e) => e.textContent);
			dbIdStr = dbIdStr?.replace('ID', '');
		}

		return parseInt(dbIdStr?.trim()) || 0;
	};

	/**
	 * Retrieve the name of an item/element. Default to first item.
	 */
	getItemName = async (item?: Item): Promise<string> => {
		const targetItem = item || (await this.getItem());
		const nameSelector = this.view === 'card' ? '.entity-card-details__name' : '.ee-entity-name';

		return await targetItem?.$eval(nameSelector, (e) => e.textContent);
	};

	/**
	 * Retrieve the description of an item/element. Default to first item.
	 */
	getItemDesc = async (item?: Item): Promise<string> => {
		const targetItem = item || (await this.getItem());
		if (this.view === 'card') {
			return await targetItem?.$eval('.entity-card-details__text', (e) => e.textContent);
		}
		// there is no description in table view.
		return '';
	};

	/**
	 * Retrieve the status of an entity. Default to first item. Only works in card view.
	 */
	getItemStatus = async (item?: Item): Promise<string> => {
		const targetItem = item || (await this.getItem());
		if (this.view === 'card') {
			return await targetItem?.$eval('.entity-card__sidebar .ee-entity-status-label', (e) => e.textContent);
		}
		return '';
	};

	/**
	 * Retrieve the dbIds of all the items in the list.
	 */
	getDbIds = async (): Promise<Array<number>> => {
		const items = await this.getListItems();

		const dbIds: Array<number> = [];

		// We can't use items.map(), because it doesn't accept promises
		for (const item of items) {
			const dbId = await this.getItemDbId(item);

			if (dbId) {
				dbIds.push(dbId);
			}
		}

		return dbIds;
	};

	/**
	 * Retrieve the cache ids of all the entities in the list, regardless of the filters.
	 */
	getAllCacheIds = async <T extends boolean>(asArray?: T): Promise<T extends true ? Array<string> : string> => {
		const idsStr = await page.$eval(this.getCacheIdsSelector(), (selector) =>
			selector?.getAttribute('data-cache-ids')
		);

		const ids = idsStr || '';

		return (asArray ? ids.split(',') : ids) as any;
	};

	/**
	 * Retrieve the number of items in the list.
	 */
	getItemCount = async (): Promise<number> => {
		const items = await this.getListItems();

		return items.length;
	};

	/**
	 * Retrieve the number of related items for a given item. Default to first item.
	 */
	getRelatedItemsCount = async (item?: Item | number): Promise<number> => {
		// if it's a db id or empty
		const targetItem = typeof item === 'number' || !item ? await this.getItem(item as number) : item;

		const count = await targetItem?.$eval('.ee-entity-actions-menu .ee-item-count', (e) => e.textContent);

		return parseInt(count?.trim()) || 0;
	};

	/**
	 * Retrieve a map of the item Ids to assigned items counts.
	 */
	getRelatedItemsCountMap = async (): Promise<Record<number, number>> => {
		const dbIds = await this.getDbIds();
		// create a map of db id and related item count
		const relatedCountInList: Record<number, number> = {};
		// check for each entity in the list
		for (const dbId of dbIds) {
			relatedCountInList[dbId] = await this.getRelatedItemsCount(dbId);
		}

		return relatedCountInList;
	};

	/**
	 * Retrieve the dbId of an item in the list by its name.
	 */
	getDbIdByName = async (name: string): Promise<number> => {
		const item = await this.getItemBy('name', name);

		return await this.getItemDbId(item);
	};

	/**
	 * Get entity status label by name.
	 */
	getStatusByName = async (name: string): Promise<string> => {
		const item = await this.getItemBy('name', name);

		return await this.getItemStatus(item);
	};

	/**
	 * Create a promise to wait for the list update.
	 * The promise should be created before list update is triggered
	 * and then await-ed after the trigger.
	 */
	createWaitForListUpdate = async (): Promise<() => Promise<JSHandle<boolean>>> => {
		// Lets save the cache IDs before update
		const cacheIdsBeforeUpdate = await this.getAllCacheIds(false);

		return async () => {
			return await page.waitForFunction(
				([cacheIdsSelector, idsBeforeSubmit]) => {
					// Current cache IDs in the list
					const newCacheIds = document.querySelector(cacheIdsSelector)?.getAttribute('data-cache-ids') || '';

					// If the cache IDs are from optimistic response
					if (newCacheIds.includes('temp:')) {
						return false;
					}

					// If new and old are not same, it means the list is updated
					return newCacheIds !== idsBeforeSubmit;
				},
				[this.getCacheIdsSelector(), cacheIdsBeforeUpdate] as const
			);
		};
	};

	/**
	 * Remove all the filters for the entity list.
	 */
	removeAllFilters = async (): Promise<void> => {
		const filterTags = await this.getFilterTags();

		const filterButtons = await filterTags.$$('.ee-filter-tag button');

		for (const button of filterButtons) {
			await button.click();
		}
	};

	/**
	 * Whether the filter bar is open.
	 */
	isFilterBarOpen = async (): Promise<boolean> => {
		const filterBar = await this.getFilterBar();
		const hideFiltersButton = await filterBar.$('[type=button] >> text=hide filters');
		// If hide filters button is visible, the filter bar is open
		return Boolean(hideFiltersButton);
	};

	/**
	 * Sets the value for the entity list filter
	 */
	setFilter = async (selector: string, values: Parameters<Item['selectOption']>[0]): Promise<void> => {
		const filterBar = await this.getFilterBar();

		if (!(await this.isFilterBarOpen())) {
			await clickButton('show filters', filterBar);
		}

		const filter = await filterBar.$(selector);

		if (!filter) {
			throw new Error('Could not find a filter by selector: ' + selector);
		}

		const nodeName = await filter.evaluate((el) => el.nodeName);

		switch (nodeName) {
			case 'SELECT':
				await filter.selectOption(values);
				break;
			case 'INPUT':
				await filter.fill(String(values));
				break;
			case 'BUTTON':
				await filter.click();
				break;
		}
	};
}
