import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './styles.css';
import CalendarSettings from './components/settings';

const AdminApp = () => {
	return (
		<ChakraProvider>
			<h1 className='calendar-plus-admin-heading'>
				Calendar<span className='plus'>✚</span> Settings
			</h1>

			<CalendarSettings />
		</ChakraProvider>
	);
};

export default AdminApp;
