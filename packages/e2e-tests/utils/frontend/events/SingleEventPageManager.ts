export class SingleEventPageManager {
	getBannerInnerText = async (): Promise<string> => {
		return await (await page.$('span.ee-status')).innerText();
	};
}
