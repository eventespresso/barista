import { Navigate } from '@eventespresso/e2e';

class Nuke {
	constructor(private readonly navigate: Navigate) {}

	public async everything(): Promise<void> {
		const page = await this.navigate.to('admin:ee:maintenance');

		await page.getByRole('link', { name: 'Reset/Delete Data' }).click();

		page.on('dialog', (dialog) => dialog.accept());

		await page.getByRole('link', { name: 'Permanently Delete All Event Espresso Data' }).click();

		await page.close();
	}
}

export { Nuke };
