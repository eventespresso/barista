export const getInputValue = async (selector: string) => {
	return await page.$eval<string, HTMLSelectElement | HTMLInputElement>(selector, (el) => el.value);
};
