// Fetch Calendar+ settings.
export async function fetchSettings() {
	try {
		if (typeof window.calendarPlusSettings !== 'undefined') {
			const { apiUrl, nonce } = window.calendarPlusSettings;

			const response = await fetch(apiUrl, {
				headers: {
					'X-WP-Nonce': nonce,
				},
			});
			if (!response.ok) {
				throw new Error('Failed to fetch settings');
			}
			return await response.json();
		}
	} catch (error) {
		console.error('Error fetching settings:', error);
		return {};
	}
}

// Save Calendar+ settings.
export async function saveSettings(settings) {
	try {
		const { apiUrl, nonce } = window.calendarPlusSettings;

		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': nonce,
			},
			body: JSON.stringify(settings),
		});
		if (!response.ok) {
			throw new Error('Failed to save settings');
		}
	} catch (error) {
		console.error('Error saving settings:', error);
	}
}
