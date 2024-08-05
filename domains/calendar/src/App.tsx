import React from 'react';
import Calendar from './components/calendar';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
const App = () => {
	return (
		<div className='App'>
			<ChakraProvider theme={theme}>
				<Calendar />
			</ChakraProvider>
		</div>
	);
};

export default App;
