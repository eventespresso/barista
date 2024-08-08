import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Button, Stack, Text } from '@chakra-ui/react';

const fetchSettings = async () => {
	if (typeof window.calendarPlusSettings !== 'undefined') {
		const { apiUrl, nonce } = window.calendarPlusSettings;

		const response = await fetch(apiUrl, {
			headers: {
				'X-WP-Nonce': nonce,
			},
		});
		const data = await response.json();
		return data;
	}
};

// Save settings to WordPress REST API
const saveSettings = async (settings) => {
	await fetch(window.calendarPlusSettings.apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-WP-Nonce': window.calendarPlusSettings.nonce,
		},
		body: JSON.stringify(settings),
	});
};

export default function CalendarSettings() {
	const [settings, setSettings] = useState({
		monthView: true,
		weekView: true,
		dayView: true,
		agendaView: true,
	});

	useEffect(() => {
		console.log('window', window.calendarPlusSettings);
		const loadSettings = async () => {
			const data = await fetchSettings();
			setSettings({
				monthView: data.monthView ?? true,
				weekView: data.weekView ?? true,
				dayView: data.dayView ?? true,
				agendaView: data.agendaView ?? true,
			});
		};

		loadSettings();
	}, []);

	const handleChange = (view) => {
		setSettings((prevSettings) => ({
			...prevSettings,
			[view]: !prevSettings[view],
		}));
	};

	const handleSave = async () => {
		await saveSettings(settings);
		alert('Settings saved successfully!');
	};

	console.log('window2', window.calendarPlusSettings);
	return (
		<Box p={5}>
			<Text fontSize='2xl' mb={4}>
				Views
			</Text>
			<Stack spacing={4}>
				<Checkbox isChecked={settings.monthView} onChange={() => handleChange('monthView')}>
					Month View
				</Checkbox>
				<Checkbox isChecked={settings.weekView} onChange={() => handleChange('weekView')}>
					Week View
				</Checkbox>
				<Checkbox isChecked={settings.dayView} onChange={() => handleChange('dayView')}>
					Day View
				</Checkbox>
				<Checkbox isChecked={settings.agendaView} onChange={() => handleChange('agendaView')}>
					Agenda View
				</Checkbox>
				<Button colorScheme='blue' onClick={handleSave}>
					Save Settings
				</Button>
			</Stack>
		</Box>
	);
}
