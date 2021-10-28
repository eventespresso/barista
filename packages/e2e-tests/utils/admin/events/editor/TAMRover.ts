import type { Page, ElementHandle } from 'playwright-core';
import { assocPath } from 'ramda';

import { clickButton, respondToAlert } from '@e2eUtils/common';
import { EE_DEBUG } from '@e2eUtils/misc';
import { EntityListParser, Field, Item } from './EntityListParser';
import { EntityType } from '../../../../types';

export type ForType = EntityType | 'all';

export type AssignmentStatus = 'OLD' | 'NEW' | 'REMOVED';

/**
 * {
 *    141: {
 *    	105: 'OLD',
 *    	108: false,
 *    	110: 'NEW',
 *    },
 *    142: {
 *    	105: 'REMOVED',
 *    	108: 'OLD',
 *    	110: false,
 *    },
 *    143: {
 *    	105: false,
 *    	108: false,
 *    	110: 'OLD',
 *	  }
 * }
 */
export type RelationalMap = {
	// Date or Ticket ID
	[key in number]: {
		[key in number]: AssignmentStatus;
	};
};

export type GetMapProps = {
	forceGenerate?: boolean;
	mapFromTo?: 'date2tickets' | 'ticket2dates';
};

export class TAMRover {
	static rootSelector = '.ee-ticket-assignments-manager';

	forType: ForType;

	dbId: number;

	parser: EntityListParser;

	relationalMap: RelationalMap;

	constructor(forType: ForType = 'all', dbId?: number) {
		this.setForType(forType);
		this.setDbId(dbId);
	}

	/**
	 * Change the "for entity type".
	 */
	setForType = (forType: ForType): TAMRover => {
		this.forType = forType;

		// set parser if TAM is for a single date or ticket
		if (this.forType && this.forType !== 'all') {
			this.setParser(this.forType);
		}

		return this;
	};

	/**
	 * Change the dbId.
	 */
	setDbId = (dbId?: number): TAMRover => {
		this.dbId = dbId;

		return this;
	};

	/**
	 * Change the "for entity type".
	 */
	setParser = (forType: Exclude<ForType, 'all'>): TAMRover => {
		this.parser = new EntityListParser(forType);

		return this;
	};

	/**
	 * Retrieve the root selector.
	 */
	getRootSelector = (): string => {
		return TAMRover.rootSelector;
	};

	/**
	 * Launch/open TAM modal.
	 */
	launch = async (options?: GetMapProps): Promise<void> => {
		if (this.forType === 'all') {
			await clickButton('Ticket Assignments');
		} else {
			// if it's for a single date or ticket
			// Lets get that entity
			const item = await this.parser.getItem(this.dbId);

			if (!item) {
				return console.error(`Could not launch TAM for ${this.forType} with dbId ${this.dbId}`);
			}

			const label = this.forType === 'datetime' ? 'assign tickets' : 'assign dates';
			// Click on the TAM button for the entity
			const tamButton = await item.$(`button[aria-label="${label}"]`);

			await tamButton?.click();
		}
		// generate the initial map
		await this.generateRelationMap(options);
	};

	/**
	 * Close TAM modal.
	 */
	close = async (): Promise<void> => {
		const closeButton = await page.$(`${this.getRootSelector()} [aria-label="close modal"]`);

		if (closeButton) {
			await closeButton.click();
		} else {
			EE_DEBUG && console.error('Could not find the close button for TAM.');
		}

		// If TAM is dirty, there may be an alert.
		await respondToAlert('Yes');

		this.reset();
	};

	/**
	 * Reset instance data.
	 */
	reset = async (): Promise<void> => {
		this.relationalMap = null;

		this.setDbId(null);
	};

	/**
	 * Submit TAM modal.
	 */
	submit = async (): Promise<void> => {
		const submitButton = await page.$(`${this.getRootSelector()} button[type=submit]`);

		if (submitButton) {
			const oldEntityType = this.parser?.entityType;
			// Ensure that parser is set
			this.setParser('ticket');

			const waitForListUpdate = await this.parser.createWaitForListUpdate();
			await submitButton.click();
			await waitForListUpdate();

			// restore the entity type
			this.setParser(oldEntityType);
		}

		this.reset();
	};

	/**
	 * Retrieve the TAM root element.
	 */
	getRoot = async (): ReturnType<Page['$']> => {
		return await page.$(this.getRootSelector());
	};

	/**
	 * Retrieve an array of rows in the table.
	 */
	getRows = async (): ReturnType<ElementHandle['$$']> => {
		const root = await this.getRoot();

		const rows = (await root?.$$('tbody tr')) || [];

		return rows;
	};

	/**
	 * Retrieve an array of columns in the table.
	 */
	getCols = async (): ReturnType<ElementHandle['$$']> => {
		const root = await this.getRoot();

		const cols = (await root?.$$('thead tr th')) || [];

		return cols;
	};

	/**
	 * Retrieve a table row.
	 * If no dbId is provided, first row will be returned.
	 */
	getRow = async (dbId?: number): ReturnType<ElementHandle['$']> => {
		if (dbId) {
			return await this.getRowBy('dbId', dbId);
		}

		const rows = await this.getRows();

		// no dbId is supplied, lets return the first row, if present
		return rows?.[0];
	};

	/**
	 * Retrieve a row/element from the table by the given field value.
	 */
	getRowBy = async (field: Field, value: string | number): ReturnType<ElementHandle['$']> => {
		const rows = await this.getRows();

		if (rows.length && field && value) {
			// We can't use items.find(), because it doesn't accept promises
			for (const item of rows) {
				const fieldValue = await this.getDateField(item, field);

				if (fieldValue === value) {
					return item;
				}
			}
		}
		return null;
	};

	/**
	 * Retrieve the field value of an item/element.
	 */
	getDateField = async (row: Item, field: Field): Promise<string | number> => {
		switch (field) {
			case 'dbId':
				return this.getDateDbId(row);

			case 'name':
				return this.getDateName(row);
		}

		return null;
	};

	/**
	 * Retrieve the dbId of the date from a row.
	 */
	getDateDbId = async (row?: Item): Promise<number> => {
		const targetItem = row || (await this.getRow());

		const dbIdStr = await targetItem?.$eval('td .date-cell-content__id', (e) => e.textContent);

		// textContent for ID is like "ID: 141"
		return dbIdStr && parseInt(dbIdStr.replace('ID: ', ''));
	};

	/**
	 * Retrieve the name of the date from a row.
	 */
	getDateName = async (row?: Item): Promise<string> => {
		const targetItem = row || (await this.getRow());

		return await targetItem?.$eval('td .date-cell-content__name', (e) => e.textContent);
	};

	/**
	 * Retrieve a table col.
	 * If no dbId is provided, first col will be returned.
	 */
	getCol = async (dbId?: number): ReturnType<ElementHandle['$']> => {
		if (dbId) {
			return await this.getColBy('dbId', dbId);
		}

		const cols = await this.getCols();

		// no dbId is supplied, lets return the first col, if present
		return cols?.[0];
	};

	/**
	 * Retrieve a col/element from the table by the given field value.
	 */
	getColBy = async (field: Field, value: string | number): ReturnType<ElementHandle['$']> => {
		const cols = await this.getCols();

		if (cols.length && field && value) {
			// We can't use items.find(), because it doesn't accept promises
			for (const item of cols) {
				const fieldValue = await this.getTicketField(item, field);

				if (fieldValue === value) {
					return item;
				}
			}
		}
		return null;
	};

	/**
	 * Retrieve the field value of an item/element.
	 */
	getTicketField = async (col: Item, field: Field): Promise<string | number> => {
		switch (field) {
			case 'dbId':
				return this.getTicketDbId(col);

			case 'name':
				return this.getTicketName(col);
		}

		return null;
	};

	/**
	 * Retrieve the dbId of the ticket from a col.
	 */
	getTicketDbId = async (col?: Item): Promise<number> => {
		const targetItem = col || (await this.getCol());

		const dbIdStr = await targetItem?.$eval('.header-cell-content__id', (e) => e.textContent);

		// textContent for ID is like "ID: 141"
		return dbIdStr && parseInt(dbIdStr.replace('ID: ', ''));
	};

	/**
	 * Retrieve the name of the ticket from a col.
	 */
	getTicketName = async (col?: Item): Promise<string> => {
		const targetItem = col || (await this.getCol());

		return await targetItem?.$eval('.header-cell-content__name', (e) => e.textContent);
	};

	/**
	 * Generates a map of the current date/ticket relations.
	 */
	getMap = async (options?: GetMapProps): Promise<RelationalMap> => {
		if (!this.relationalMap || options?.forceGenerate) {
			await this.generateRelationMap(options);
		}
		return this.relationalMap;
	};

	/**
	 * Retrieve all the date Ids in an array.
	 */
	getDateIds = async (): Promise<Array<number>> => {
		const map = await this.getMap({ forceGenerate: true, mapFromTo: 'date2tickets' });

		return Object.keys(map).map(Number);
	};

	/**
	 * Retrieve all the ticket Ids in an array.
	 */
	getTicketIds = async (): Promise<Array<number>> => {
		const map = await this.getMap({ forceGenerate: true, mapFromTo: 'ticket2dates' });

		return Object.keys(map).map(Number);
	};

	/**
	 * Create a map of the item Ids to assigned items counts.
	 */
	getAssigmentsCountMap = async (options?: GetMapProps): Promise<Record<number, number>> => {
		const map = await this.getMap(options);

		return Object.entries(map).reduce((prevMap, [entityId, relationMap]) => {
			return { ...prevMap, [entityId]: Object.values(relationMap).filter((v) => v === 'OLD').length };
		}, {});
	};

	/**
	 * Toggle the assignment between all dates and tickets
	 */
	toggleAllAssignments = async (): Promise<void> => {
		const dateIds = await this.getDateIds();
		const ticketIds = await this.getTicketIds();

		for (const dateId of dateIds) {
			for (const ticketId of ticketIds) {
				await this.toggleAssignment(dateId, ticketId);
			}
		}
	};

	/**
	 * Toggle the assignment between a date and a ticket
	 */
	toggleAssignment = async (dateDbId: number, ticketDbId: number): Promise<void> => {
		const dateRow = await this.getRow(dateDbId);
		const ticketCols = await this.getCols();
		const dateCells = await dateRow.$$('td');

		// Now we need to iterate over each ticket column
		// first column (0 index) is the top-left corner, of no use to us.
		for (let colIndex = 1; colIndex < ticketCols.length; colIndex++) {
			const col = ticketCols[colIndex];
			// get the db ID for the ticket in the column
			const dbId = await this.getTicketDbId(col);
			// if we are lucky to have identified the target
			if (dbId === ticketDbId) {
				// this is the cell button that toggles the assignment
				const button = await dateCells?.[colIndex]?.$('button');
				// toggle the assignment
				await button.click();
				break;
			}
		}
	};

	/**
	 * Generates a map of the current date/ticket relations.
	 */
	generateRelationMap = async (options?: GetMapProps): Promise<TAMRover> => {
		const rows = await this.getRows();
		const cols = await this.getCols();

		let map: RelationalMap = {};

		const fromTo = options?.mapFromTo || 'date2tickets';

		// lets iterate over each date row
		for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
			const row = rows[rowIndex];

			// get the db ID for the date in the row
			const dateDbId = await this.getDateDbId(row);

			if (dateDbId) {
				// Each row has cells, created against tickets
				const dateCells = await row.$$('td');
				// Now we need to iterate over each ticket column
				// first column (0 index) is the top-left corner, of no use to us.
				for (let colIndex = 1; colIndex < cols.length; colIndex++) {
					const col = cols[colIndex];
					// get the db ID for the ticket in the column
					const ticketDbId = await this.getTicketDbId(col);

					if (ticketDbId) {
						// this is the cell button that toggles the assignment
						const button = await dateCells?.[colIndex]?.$('button');
						// current status is added as arial-label
						let status = await button?.getAttribute('aria-label');
						// if status is "assign tickets", lets mark it as null
						status = status === 'assign ticket' ? null : status;

						// Whether the map should be from dates to tickets or vice versa
						const path =
							fromTo === 'date2tickets'
								? [`${dateDbId}`, `${ticketDbId}`]
								: [`${ticketDbId}`, `${dateDbId}`];
						// Lets update the map
						map = assocPath(path, status, map);
					}
				}
			}
		}

		this.relationalMap = map;

		return this;
	};
}
