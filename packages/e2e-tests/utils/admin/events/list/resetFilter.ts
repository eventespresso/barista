export const resetFilter = async () => {
	// select the unique identity for reset filters button
	const selector = 'text="Reset Filters"';
	// hit the reset filters button
	await Promise.all([page.waitForNavigation(), page.click(selector)]);
};
