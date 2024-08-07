import React from 'react';
import Calendar from './components/calendar';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { ModalProvider } from '../src/lib/context/modalContext';
import EventDetailModal from './components/calendar/event-detail-modal';
const App = () => {
	return (
		<div className='App'>
			<ChakraProvider theme={theme}>
				<ModalProvider>
					<Calendar />
					<EventDetailModal />
				</ModalProvider>
			</ChakraProvider>
		</div>
	);
};

export default App;
