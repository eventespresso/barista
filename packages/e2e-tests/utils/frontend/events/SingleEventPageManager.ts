export class SingleEventPageManager {
	/**
	 * get banner innertext
	 */
	getBannerInnerText = async (): Promise<string> => {
		return await (await page.$('span.ee-status')).innerText();
	};
}
