import { test } from '@eventespresso/e2e';
import { expect } from '@playwright/test';

test('make event', async ({ client }) => {
	const event = await client.makeEvent({ name: 'test event' });
	await expect(event).toBeDefined();
});
