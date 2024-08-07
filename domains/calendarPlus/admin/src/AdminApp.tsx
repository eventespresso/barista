import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './styles.css';

const AdminApp = () => {
	return (
		<ChakraProvider>
			<h1 className='calendar-plus-admin-heading'>
				Calendar<span className='plus'>✚</span> Settings
			</h1>
		</ChakraProvider>
	);
};

export default AdminApp;
