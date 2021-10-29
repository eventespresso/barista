export const assertSelectedDefaultOption = async (selector: string, value: string) => {
	// lets get all its option elements
	const options = await page.$$(`select${selector} option`);
	// select the first/default option in select and get the innertext then trim the string
	const content = (await options[0].innerText()).trim();
	// select the default value in selector
	await page.selectOption(`select${selector}`, {
		label: value,
	});
	// assert default value in a select filter
	expect(content).toBe(value);

	return content;
};
