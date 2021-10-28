export const addNewRegistration = async () => {
	const regURl = await page.$eval('.ee-editor-details-reg-url-link', (el) => el.getAttribute('href'));

	await page.goto(regURl);

	const newReqUrl = await page.$eval('#add-new-registration', (el) => el.getAttribute('href'));

	await page.goto(newReqUrl);
};
