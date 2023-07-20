import { Navigate } from '@eventespresso/e2e';
import { Page } from '@playwright/test';

type Button = 'Publish' | 'Save Draft' | 'Move to Trash';

class Events {
	private title: string;
	private startDate?: string;
	private endDate?: string;
	private page?: Page;

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

	public async make(button: Button): Promise<void> {
		await this.save(button);
	}

	public async close(): Promise<void> {
		if (this.page) {
			await this.page.close();
		}
	}

	private async setDates(): Promise<void> {
		await this.page.getByRole('button', { name: 'Edit Event Date' }).click();
		const setDate = async (label: string, value: string): Promise<void> => {
			await this.page
				.locator('div')
				.filter({ hasText: new RegExp(`^${label}$`) })
				.getByRole('textbox')
				.fill(value);
			await this.page.getByRole('dialog', { name: 'Edit Event Date' }).click({ position: { x: 1, y: 1 } });
		};
		if (this.startDate) {
			await setDate('start date', this.startDate);
		}
		if (this.endDate) {
			await setDate('end date', this.endDate);
		}
		await this.page.getByRole('button', { name: 'save', exact: true }).click();
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
		if (this.page) {
			await this.page.goto(this.navigate.routes['admin:ee:events:new']);
		}
		if (!this.page) {
			this.page = await this.navigate.to('admin:ee:events:new');
		}
		await this.page.getByLabel('Edit Event', { exact: true }).fill(this.title);
		if (this.startDate || this.endDate) {
			await this.setDates();
		}
		if (button === 'Move to Trash') {
			// if we do not save draft, for some reason input information like title is getting lost
			await this.page.getByRole('button', { name: 'Save Draft' }).click();
			await this.page.getByRole('link', { name: button }).click();
		}
		if (button !== 'Move to Trash') {
			await this.page.getByRole('button', { name: button }).click();
		}
	}
}

export { Events };

export type { Button };
