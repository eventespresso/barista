import { clickButton } from '@e2eUtils/common';
import { EntityEditor, CommonEntityFields } from './EntityEditor';
import { ListView, Item, Field } from './EntityListParser';
import { fillDateTicketForm } from './fillDateTicketForm';

export interface TicketFields extends CommonEntityFields {
	quantity?: string;
}

export class TicketEditor extends EntityEditor {
	constructor(view: ListView = 'card') {
		super('ticket', view);

		this.dropdownMenuLabel = 'ticket main menu';
		this.editButtonLabel = 'edit ticket';
		this.deleteButtonLabel = 'trash ticket';
		this.copyButtonLabel = 'copy ticket';
	}

	/**
	 * Reset instance data.
	 */
	reset(): void {
		super.reset();
		this.setEntityType('ticket');
	}

	/**
	 * Given an entity item, it updates the quantity in the inline edit input
	 */
	updateQuantityInline = async (item: Item, quantity: string | number) => {
		await this.updateDetailsInputInline(item, String(quantity));
	};

	/**
	 * Given an entity item, it updates the price in the inline edit input
	 */
	updatePriceInline = async (item: Item, price: number | string) => {
		const inlineEditPreview = await item.$('.entity-card__details .ee-currency-input .ee-tabbable-text');
		await inlineEditPreview.click();
		const inlineEditInput = await item.$('.entity-card__details .ee-currency-input input');
		await inlineEditInput.type(String(price));

		const waitForListUpdate = await this.createWaitForListUpdate();
		await page.click(this.getRootSelector()); // click outside of the inline input
		await waitForListUpdate();
	};

	/**
	 * Opens the edit form for the ticket identified by the field and its value.
	 */
	fillAndSubmitForm = async (formData: TicketFields): Promise<void> => {
		// Fill in the details
		await fillDateTicketForm(formData);
		// Move to the last step
		await clickButton('Skip prices - assign dates');
		// Submit the modal/form
		await this.submitEditForm();
	};

	/**
	 * Opens the edit form for the ticket identified by the field and its value.
	 */
	editTicketBy = async (field: Field, value: string | number, formData: TicketFields): Promise<void> => {
		// Open the edit form modal
		await this.openEditFormBy(field, value);
		// Fill and submit the edit form
		await this.fillAndSubmitForm(formData);
	};

	/**
	 * Opens the edit form for the ticket identified by the field and its value.
	 */
	editTicket = async (item: Item, formData: TicketFields): Promise<void> => {
		// Open the edit form modal
		await this.openEditForm(item);
		// Fill and submit the edit form
		await this.fillAndSubmitForm(formData);
	};
}
