import React from 'react';
import Calendar from './components/calendar';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { ModalProvider } from '../src/lib/context/modalContext';
import EventDetailModal from './components/calendar/event-detail-modal';
import { CalendarSettingsProvider } from '../src/lib/context/calendarSettingsContext';
const App = () => {
	return (
		<div className='App'>
			<ChakraProvider theme={theme}>
				<CalendarSettingsProvider>
					<ModalProvider>
						<Calendar />
						<EventDetailModal />
					</ModalProvider>
				</CalendarSettingsProvider>
			</ChakraProvider>
		</div>
	);
};

export default App;
