import { Navigate } from '@eventespresso/e2e';
import { Page } from '@playwright/test';

type Button = 'Publish' | 'Save Draft' | 'Move to Trash';

class Events {
	private title: string;
	private startDate?: string;
	private endDate?: string;

	constructor(private readonly navigate: Navigate) {}

	public name(title: string): Events {
		this.title = title;
		return this;
	}

	public setStart(date: string | Date): Events {
		if (typeof date === 'string') {
			this.startDate = date;
		}
		if (typeof date !== 'string') {
			this.startDate = this.convertDateToStr(date);
		}
		return this;
	}

	public setEnd(date: string | Date): Events {
		if (typeof date === 'string') {
			this.endDate = date;
		}
		if (typeof date !== 'string') {
			this.endDate = this.convertDateToStr(date);
		}
		return this;
	}

	public async publish(): Promise<void> {
		await this.save('Publish');
	}

	public async draft(): Promise<void> {
		await this.save('Save Draft');
	}

	public async trash(): Promise<void> {
		await this.save('Move to Trash');
	}

	private async setDate(page: Page, label: 'start date' | 'end date', value: string): Promise<void> {
		await page.getByRole('button', { name: 'Edit Event Date' }).click();
		await page
			.locator('div')
			.filter({ hasText: /^start date$/ })
			.getByRole('textbox')
			.fill(value);
		await page.getByRole('dialog', { name: 'Edit Event Date' }).click({ position: { x: 1, y: 1 } });
		await page.getByRole('button', { name: 'save', exact: true }).click();
	}

	private convertDateToStr(date: Date): string {
		// sample string: August 17, 2023 8:00 AM
		const month = date.toLocaleString('default', { month: 'long' });
		const day = date.getDate();
		const year = date.getFullYear();
		const time = date
			.toLocaleString('default', { hourCycle: 'h12', hour: 'numeric', minute: '2-digit' })
			.toUpperCase();
		return `${month} ${day}, ${year} ${time}`;
	}

	private async save(button: Button): Promise<void> {
		const page = await this.navigate.to('admin:ee:events:new');
		await page.getByLabel('Edit Event', { exact: true }).fill(this.title);
		if (this.startDate) {
			await this.setDate(page, 'start date', this.startDate);
		}
		if (this.endDate) {
			await this.setDate(page, 'end date', this.endDate);
		}
		if (button === 'Move to Trash') {
			// if we do not save draft, for some reason input information like title is getting lost
			await page.getByRole('button', { name: 'Save Draft' }).click();
			await page.getByRole('link', { name: button }).click();
		}
		if (button !== 'Move to Trash') {
			await page.getByRole('button', { name: button }).click();
		}
		await page.close();
	}
}

export { Events };