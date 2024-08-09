import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Button, Stack, Spinner, useToast, Heading, Select, FormLabel, Divider } from '@chakra-ui/react';
import { fetchSettings, saveSettings } from '../../lib/api';
import { useCustomToast } from '../../lib/hooks';

import type { ICalendarPlusSettings } from '../../lib/types';

const defaultViewOptions = [
	{ value: 'month', label: 'Month View' },
	{ value: 'week', label: 'Week View' },
	{ value: 'day', label: 'Day View' },
	{ value: 'agenda', label: 'Agenda View' },
];

export default function CalendarSettings() {
	const { successToast } = useCustomToast();

	const [settings, setSettings] = useState<ICalendarPlusSettings | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadSettings = async () => {
			const data = await fetchSettings();
			setSettings({
				monthView: data.monthView ?? false,
				weekView: data.weekView ?? false,
				dayView: data.dayView ?? false,
				agendaView: data.agendaView ?? false,
				defaultView: data.defaultView ?? 'month',
			});
			setLoading(false);
		};

		loadSettings();
	}, []);

	const handleChange = (view: keyof ICalendarPlusSettings) => {
		setSettings((prevSettings) => {
			const newSettings = { ...prevSettings, [view]: !prevSettings[view] };
			if (newSettings.defaultView && !newSettings[view]) {
				// If the default view is set to the unchecked view, reset it
				if (newSettings.defaultView === view) {
					newSettings.defaultView = 'month';
				}
			}
			return newSettings;
		});
	};

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSettings((prevSettings) => ({
			...prevSettings,
			defaultView: event.target.value,
		}));
	};

	const handleSave = async () => {
		await saveSettings(settings);
		successToast({
			title: 'Settings saved.',
			description: 'Calendar+ settings are saved.',
		});
	};

	if (loading) {
		return <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' m={8} />;
	}

	// Filter options based on current settings
	const filteredOptions = defaultViewOptions.filter(
		(option) => settings?.[`${option.value}View` as keyof ICalendarPlusSettings] ?? false
	);

	return (
		<Box p={5}>
			<FormLabel mb={4}>Views</FormLabel>
			<Stack spacing={4}>
				<Checkbox isChecked={settings.monthView} borderRadius='sm' onChange={() => handleChange('monthView')}>
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
				<Divider />
				<Box>
					<FormLabel htmlFor='defaultView'>Default View</FormLabel>
					<Select
						id='defaultView'
						value={settings?.defaultView ?? 'month'}
						onChange={handleSelectChange}
						placeholder='Select default view'
					>
						{filteredOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Select>
				</Box>
				<Button colorScheme='blue' onClick={handleSave}>
					Save Settings
				</Button>
			</Stack>
		</Box>
	);
}
