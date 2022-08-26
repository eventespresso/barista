import { clickButton } from '@e2eUtils/common';
import { EntityEditor, CommonEntityFields, CommonFilters } from './EntityEditor';
import { ListView, Item, Field } from './EntityListParser';
import { fillDateTicketForm } from './fillDateTicketForm';
import { DO_NOT_USE_BARISTA_STRUCTURE } from '../../../../utils/dev/config';

export interface DateFields extends CommonEntityFields {
	capacity?: string;
}

export class DateEditor extends EntityEditor {
	constructor(view: ListView = 'card') {
		super('datetime', view);

		this.dropdownMenuLabel = 'event date main menu';
		this.editButtonLabel = 'edit datetime';
		this.trashButtonLabel = 'trash datetime';
		this.copyButtonLabel = 'copy datetime';

		if(DO_NOT_USE_BARISTA_STRUCTURE){
			this.trashAlertConfirmLabel = 'yes';
		}
	}

	/**
	 * Reset instance data.
	 */
	reset(): void {
		super.reset();
		this.setEntityType('datetime');
	}

	/**
	 * Filters the list by the given field and value.
	 */
	async filterListBy(filter: CommonFilters, values: Parameters<Item['selectOption']>[0]): Promise<void> {
		const selector =
			filter === 'status'
				? '#ee-dates-list-status-control'
				: filter === 'sales'
				? '#ee-dates-list-sales-control'
				: filter === 'search'
				? '#ee-search-input-dates-list'
				: '';

		if (!selector) {
			console.log('Unknown filter supplied: ' + filter);
			return;
		}
		await this.setFilter(selector, values);
	}

	/**
	 * sorts the list by the given field and value.
	 */
	async sortBy(values: Parameters<Item['selectOption']>[0]): Promise<void> {
		const selector = '#ee-dates-list-sort-by-control';

		await this.setFilter(selector, values);
	}

	/**
	 * Given an entity item, it updates the capacity in the inline edit input
	 */
	updateCapacityInline = async (item?: Item, capacity?: string | number) => {
		await this.updateDetailsInputInline(item, String(capacity));
	};

	/**
	 * Opens the edit form for the date identified by the field and its value.
	 */
	fillAndSubmitForm = async (formData: DateFields): Promise<void> => {
		// Fill in the details
		await fillDateTicketForm(formData);
		// Move to the last step
		await clickButton('Save and assign tickets');
		// Submit the modal/form
		await this.submitEditForm();
	};

	/**
	 * Opens the edit form for the date identified by the field and its value.
	 */
	editDateBy = async (field: Field, value: string | number, formData: DateFields): Promise<void> => {
		// Open the edit form modal
		await this.openEditFormBy(field, value);
		// Fill and submit the edit form
		await this.fillAndSubmitForm(formData);
	};

	/**
	 * Opens the edit form for the date identified by the field and its value.
	 */
	editDate = async (item?: Item, formData?: DateFields): Promise<void> => {
		// Open the edit form modal
		await this.openEditForm(item);
		// Fill and submit the edit form
		await this.fillAndSubmitForm(formData);
	};
}
