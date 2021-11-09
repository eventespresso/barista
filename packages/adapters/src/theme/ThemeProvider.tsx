import { ChakraProvider, extendTheme, LightMode } from '@chakra-ui/react';

import { isRTL } from '@eventespresso/i18n';

const theme = extendTheme({
	direction: isRTL() ? 'rtl' : 'ltr',
	initialColorMode: 'light',
	styles: null,
	useSystemColorMode: false,
});

const environment = { window, document };

const ThemeProvider: React.FC = ({ children }) => {
	return (
		<ChakraProvider theme={theme} resetCSS environment={environment}>
			<LightMode>{children}</LightMode>
		</ChakraProvider>
	);
};

export default ThemeProvider;
