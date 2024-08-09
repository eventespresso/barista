import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Button, Stack, Spinner, useToast, Heading } from '@chakra-ui/react';
import { fetchSettings, saveSettings } from '../../lib/api';
import { useCustomToast } from '../../lib/hooks';

import type { ICalendarPlusSettings } from '../../lib/types';

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
			});
			setLoading(false);
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
		successToast({
			title: 'Settings saved.',
			description: 'Calendar+ settings are saved.',
		});
	};

	return (
		<>
			{loading ? (
				<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' m={8} />
			) : (
				<Box p={5}>
					<Heading mb={4}>Views</Heading>
					<Stack spacing={4}>
						<Checkbox
							isChecked={settings.monthView}
							borderRadius='sm'
							onChange={() => handleChange('monthView')}
						>
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
			)}{' '}
		</>
	);
}
