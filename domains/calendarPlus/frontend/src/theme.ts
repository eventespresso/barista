import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
// import type { StyleFunctionProps } from '@chakra-ui/styled-system';

const tokens = {};

const semanticTokens = {
	colors: {},
	shadows: {},
};

const styles = {
	global: (props) => ({
		// a: {
		// 	alignItems: 'center',
		// 	color: 'ee.font.light',
		// 	display: 'inline-flex',
		// 	_hover: {
		// 		textDecoration: 'underline',
		// 	},
		// },
		// fonts: {
		// 	heading: 'var(--system-ui)',
		// 	body: 'var(--system-ui)',
		// },
		// body: {
		// 	fontSize: { base: '14', tablet: '16', wide_screen: '18' },
		// 	color: mode('ee.font.light', 'gray.200')(props),
		// 	bg: mode('white', 'gray.900')(props),
		// },
		// h1: {
		// 	color: mode('ee.font.dark', 'gray.400')(props),
		// 	fontSize: '8xl',
		// 	fontWeight: 900,
		// },
		// h2: {
		// 	color: mode('ee.font.dark', 'gray.300')(props),
		// 	fontSize: '6xl',
		// 	fontWeight: 900,
		// },
		// h3: {
		// 	color: mode('ee.font.dark', 'gray.300')(props),
		// 	fontSize: '4xl',
		// 	fontWeight: 900,
		// },
		// h4: {
		// 	color: mode('ee.font.dark', 'gray.300')(props),
		// 	fontSize: '2xl',
		// 	fontWeight: 800,
		// },
		// h5: {
		// 	color: mode('ee.font.dark', 'gray.200')(props),
		// 	fontSize: 'lg',
		// 	fontWeight: 700,
		// },
		// h6: {
		// 	color: mode('ee.font.dark', 'gray.100')(props),
		// 	fontSize: 'md',
		// 	fontWeight: 600,
		// },
		p: {
			m: 0,
		},
		span: {
			m: 0,
		},
	}),
};

const components = {
	Button: {
		baseStyle: {
			borderRadius: 'md',
			color: 'white',
		},
		variants: {
			primary: {
				bgGradient: 'linear(to-br, blue.500, blue.400)',
				_hover: {
					bgGradient: 'linear(to-br, blue.600, blue.500)',
				},
				_active: {
					bgGradient: 'linear(to-br, blue.500, blue.400)',
				},
				_disabled: {
					bgGradient: 'linear(to-br, blue.50, blue.50)',
					_hover: {
						bgGradient: 'linear(to-br, blue.50, blue.50)',
						color: 'white !important',
					},
				},
			},
			secondary: {
				bgGradient: 'linear(to-br, cyan.600, cyan.500)',
				_hover: {
					bgGradient: 'linear(to-br, cyan.700, cyan.600)',
				},
				_active: {
					bgGradient: 'linear(to-br, cyan.600, cyan.500)',
				},
				_disabled: {
					bgGradient: 'linear(to-br, cyan.50, cyan.50)',
					_hover: {
						bgGradient: 'linear(to-br, cyan.50, cyan.50)',
						color: 'white !important',
					},
				},
			},
			accent: {
				bgGradient: 'linear(to-br, yellow.600, yellow.500)',
				_hover: {
					bgGradient: 'linear(to-br, yellow.700, yellow.600)',
				},
				_active: {
					bgGradient: 'linear(to-br, yellow.600, yellow.500)',
				},
				_disabled: {
					bgGradient: 'linear(to-br, yellow.50, yellow.50)',
					_hover: {
						bgGradient: 'linear(to-br, yellow.50, yellow.50)',
						color: 'white !important',
					},
				},
			},
			caution: {
				backgroundColor: 'hsla(340, 80%, 50%, 1)',
				_hover: {
					backgroundColor: 'hsla(340, 100%, 67.5%, 1)',
				},
				_active: {
					backgroundColor: 'hsla(340, 80%, 40%, 1)',
				},
				_disabled: {
					backgroundColor: 'hsla(340, 40%, 50%, 1) !important',
					_hover: {
						backgroundColor: 'hsla(340, 40%, 50%, 1) !important',
						color: 'white !important',
					},
				},
			},
			orange: {
				backgroundColor: 'hsl(20, 100%, 60%)',
				_hover: {
					backgroundColor: 'hsl(20, 100%, 40%)',
				},
				_active: {
					backgroundColor: 'hsla(20, 100%, 40%, 1)',
				},
				_disabled: {
					backgroundColor: 'hsla(20°, 82%, 66%, 1) !important',
					_hover: {
						backgroundColor: 'hsla(20°, 82%, 66%, 1) !important',
						color: 'white !important',
					},
				},
			},
		},
		sizes: {
			md: {
				h: 8,
				p: '5px 16px',
				fontSize: '14px',
			},
		},
		defaultProps: {
			size: 'md',
		},
	},
};
export const screenSizes = {
	phone: '27rem', // 432px
	phoneXL: '37.5rem', // 600px
	tablet: '48rem', // 768px
	tabletXL: '64rem', // 1024px
	desktop: '80rem', // 1280px
	wide_screen: '105rem', // 1680px
};

export const theme = extendTheme({
	breakpoints: screenSizes,
	colors: {
		transparent: 'transparent',
		black: '#000',
		white: '#fff',
		red: {
			'50': '#FBEAEE',
			'100': '#F3C3CF',
			'200': '#EC9DAF',
			'300': '#E47790',
			'400': '#DC5071',
			'500': '#D52A52',
			'600': '#AA2242',
			'700': '#801931',
			'800': '#551121',
			'900': '#2B0810',
		},
		orange: {
			'50': '#FFF0E6',
			'100': '#FED5B9',
			'200': '#FDBB8C',
			'300': '#FCA05E',
			'400': '#FC8531',
			'500': '#FB6B04',
			'600': '#C95503',
			'700': '#974002',
			'800': '#642B02',
			'900': '#321501',
		},
		yellow: {
			'50': '#FEF8E6',
			'100': '#FDEBB9',
			'200': '#FCDE8C',
			'300': '#FBD15F',
			'400': '#FAC432',
			'500': '#F9B706',
			'600': '#C89204',
			'700': '#966E03',
			'800': '#644902',
			'900': '#322501',
		},
		green: {
			'50': '#ECF8EF',
			'100': '#CAEDD2',
			'200': '#A8E1B4',
			'300': '#86D597',
			'400': '#64C97A',
			'500': '#42BD5D',
			'600': '#35974A',
			'700': '#287138',
			'800': '#1A4C25',
			'900': '#0D2613',
		},
		teal: {
			'50': '#EBF9FA',
			'100': '#C6EDF1',
			'200': '#A1E2E8',
			'300': '#7CD6DF',
			'400': '#57CBD6',
			'500': '#32C0CD',
			'600': '#2899A4',
			'700': '#1E737B',
			'800': '#144D52',
			'900': '#0A2629',
		},
		cyan: {
			'50': '#ECF8F6',
			'100': '#CAEDE6',
			'200': '#A8E1D5',
			'300': '#86D5C5',
			'400': '#64C9B4',
			'500': '#42BDA4',
			'600': '#359783',
			'700': '#287162',
			'800': '#1A4C42',
			'900': '#0D2621',
		},
		blue: {
			'50': '#EAF2FB',
			'100': '#C4DAF3',
			'200': '#9DC3EB',
			'300': '#77ABE4',
			'400': '#5193DC',
			'500': '#2B7CD4',
			'600': '#2263AA',
			'700': '#1A4A7F',
			'800': '#113155',
			'900': '#09192B',
		},
		purple: {
			'50': '#EEF0F6',
			'100': '#D0D4E6',
			'200': '#B2B8D6',
			'300': '#949DC6',
			'400': '#7681B6',
			'500': '#5865A7',
			'600': '#475185',
			'700': '#353D64',
			'800': '#232943',
			'900': '#121421',
		},
		pink: {
			'50': '#FDE7F1',
			'100': '#FABDD8',
			'200': '#F692BF',
			'300': '#F368A5',
			'400': '#EF3D8C',
			'500': '#EC1373',
			'600': '#BD0F5C',
			'700': '#8E0B45',
			'800': '#5E082E',
			'900': '#2F0417',
		},
		gray: {
			'50': '#F1F3F4',
			'100': '#D7DDDF',
			'200': '#BEC7CB',
			'300': '#A4B1B7',
			'400': '#8B9BA2',
			'500': '#71858E',
			'600': '#5A6A72',
			'700': '#445055',
			'800': '#2D3539',
			'900': '#171B1C',
		},
	},
	fontSizes: {
		sm: '16px',
		md: '20px',
		lg: '24px',
		'2xl': '80px',
	},
	radii: {
		xs: '4px',
		sm: '8px',
		md: '12px',
		lg: '16px',
		'2xl': '64px',
		'3xl': '80px',
	},
	space: {
		xs: '0.5rem',
		sm: '1rem',
		md: '1.5rem',
		lg: '2rem',
		xl: '2.5rem',
		'2xl': '3rem',
		'3xl': '4rem',
		'4xl': '5rem',
	},
	config: {
		initialColorMode: 'system',
		useSystemColorMode: true,
	},
	sizes: {
		container: screenSizes,
	},
	styles,
	semanticTokens,
	components,
});
