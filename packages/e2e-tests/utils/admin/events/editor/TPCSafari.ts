import type { Page } from 'playwright-core';

import { formatAmount } from '@eventespresso/utils';
import type { TpcPriceModifier } from '@eventespresso/tpc';
import { getPriceModifiers } from '@eventespresso/predicates';
import { convertToModifier, createPrices, PriceCreator } from '@eventespresso/tpc/src/utils/test/utils';

import { respondToAlert } from '@e2eUtils/common';
import { EE_DEBUG } from '@e2eUtils/misc';
import { EntityListParser } from './EntityListParser';
import { setPrice } from './setPrice';
import { setPrices } from './setPrices';

export class TPCSafari {
	static rootSelector = '.ee-tpc';

	static decimalPlaces = 2;

	dbId: number;

	parser: EntityListParser;

	constructor(dbId?: number) {
		this.setDbId(dbId);
		this.parser = new EntityListParser('ticket');
	}

	/**
	 * Reset instance data.
	 */
	reset = (): void => {
		this.setDbId(undefined);
	};

	/**
	 * Change the dbId.
	 */
	setDbId = (dbId?: number): TPCSafari => {
		this.dbId = dbId;

		return this;
	};

	/**
	 * Retrieve the root selector.
	 */
	getRootSelector = (): string => {
		return TPCSafari.rootSelector;
	};

	/**
	 * Retrieve the TPC root element.
	 */
	getRoot = async (): ReturnType<Page['$']> => {
		return await page.$(this.getRootSelector());
	};

	/**
	 * Launch/open TAM modal.
	 */
	launch = async (dbId?: number): Promise<void> => {
		this.setDbId(dbId || this.dbId);
		// Lets get the entity
		const item = await this.parser.getItem(this.dbId);

		if (!item) {
			return console.error(`Could not launch TPC for ticket with dbId ${this.dbId}`);
		}

		// Click on the TPC button for the ticket
		const tpcButton = await item.$('[aria-label="ticket price calculator"]');

		await tpcButton?.click();
	};

	/**
	 * Close TPC modal.
	 */
	close = async (): Promise<void> => {
		const closeButton = await page.$(`${this.getRootSelector()} [aria-label="close modal"]`);

		if (closeButton) {
			await closeButton.click();
		} else {
			EE_DEBUG && console.error('Could not find the close button for TPC.');
		}
		// If TPC is dirty, there may be an alert.
		await respondToAlert('Yes');

		this.reset();
	};

	/**
	 * Submit TPC modal.
	 */
	submit = async (): Promise<void> => {
		const submitButton = await page.$(`${this.getRootSelector()} button[type=submit]`);

		if (submitButton) {
			const waitForListUpdate = await this.parser.createWaitForListUpdate();
			await submitButton.click();
			await waitForListUpdate();
		}

		this.reset();
	};

	/**
	 * Updates the TPC Modal header title
	 */
	updateHeader = async (title: string): Promise<void> => {
		const root = await this.getRoot();
		await root.$eval(
			'header.ee-modal__header',
			(header, text) => {
				// First child node is the text node, containing the title
				header.firstChild.replaceWith(text);
			},
			title
		);
	};

	/**
	 * Returns true if reverse calculate is ON
	 */
	isReverseCalculateOn = async (): Promise<boolean> => {
		const root = await this.getRoot();
		const revCalcButton = await root.$('[aria-label="Disable reverse calculate"]');
		// If the element is found, it will be truthy
		return Boolean(revCalcButton);
	};

	/**
	 * Sets reverse calculate to true or false
	 */
	setReverseCalculate = async (value = false): Promise<void> => {
		const isReverseCalculateOn = await this.isReverseCalculateOn();

		if (isReverseCalculateOn !== value) {
			const selector = `[aria-label="${isReverseCalculateOn ? 'Disable' : 'Enable'} reverse calculate"]`;

			const root = await this.getRoot();
			const revCalcButton = await root.$(selector);

			await revCalcButton?.click();
		}
	};

	/**
	 * Set the ticket total price
	 */
	setTicketTotal = async (total: number): Promise<void> => {
		const root = await this.getRoot();

		const ticketTotalInput = await root.$('[aria-label="ticket total"]');

		await ticketTotalInput.fill((total || '').toString());
	};

	/**
	 * Get the ticket total price
	 */
	getTicketTotal = async (): Promise<string> => {
		const root = await this.getRoot();

		const calculatedTotal = await root.$eval('#ticket-price-total', (el: HTMLInputElement) => el?.value);

		return this.getFormattedAmount(calculatedTotal);
	};

	/**
	 * Sets the base price details inside TPC
	 */
	setBasePrice = async (price: Partial<TpcPriceModifier>): Promise<void> => {
		await setPrice({ ...price, isBasePrice: true } as TpcPriceModifier);
	};

	/**
	 * Get the base price amount
	 */
	getBasePrice = async (): Promise<string> => {
		const root = await this.getRoot();
		const firstTPCRow = '.ee-ticket-price-calculator tbody tr:first-child';

		const calculatedPrice = await root.$eval(
			`${firstTPCRow} [aria-label="amount"]`,
			(el: HTMLInputElement) => el?.value
		);
		return this.getFormattedAmount(calculatedPrice);
	};

	/**
	 * Adds prices to TPC
	 */
	setPrices = async (prices: Array<PriceCreator>, modifiersOnly = false): Promise<void> => {
		const testPrices = this.createPrices(prices);

		// set modifiers
		await setPrices(modifiersOnly ? getPriceModifiers(testPrices) : testPrices);

		// Focus on root to make sure the amount is updated when empty
		const root = await this.getRoot();
		await root.focus();
	};

	/**
	 * Create prices from test price creator predicates
	 */
	createPrices = (prices: Array<PriceCreator>): Array<TpcPriceModifier> => {
		// increments the index by "2" instead of the default "1" to set the price order.
		// to make sure that the order for prices at index "0" is at least "2"
		// i.e. greater than or equal to the minimum allowed order
		const testPrices = createPrices(prices.map(convertToModifier), 2);

		return testPrices;
	};

	/**
	 * The the properly formatted amount
	 */
	getFormattedAmount = formatAmount(TPCSafari.decimalPlaces);
}
