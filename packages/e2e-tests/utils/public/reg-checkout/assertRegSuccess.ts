/**
 * Asserts that the registration is successful.
 */
export const assertRegSuccess = async (): Promise<string> => {
	const content = await page.$eval('.entry-content', (el) => el.textContent);

	expect(content).toContain('Your registration has been successfully processed.');

	expect(content).toContain('View Full Order Confirmation Receipt');

	return content;
};
