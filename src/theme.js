import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
	palette: {
		error: {
			main: '#ff0033',
		},
		success: {
			main: '#4BB543',
		},
		divider: 'rgba(53, 54, 56, 1)',
		background: {
			default: 'rgba(86, 87, 89, 1)',
		},
		primary: {
			main: 'rgba(32, 32, 32, 1)',
		},
		secondary: {
			main: 'rgba(0, 255, 196, 1)',
			light: 'rgba(0, 255, 196, 0.1)',
			dark: 'rgba(54, 54, 54, 1)',
		},
	},
	typography: {
		allVariants: {
			color: 'white',
		},
		fontFamily: 'Jura, sans-serif',
		h1: {
			fontSize: '2rem',
			fontWeight: 700,
		},
		h2: {
			fontSize: '1.58rem',
			fontWeight: 700,
		},
		h3: {
			fontSize: '1.77rem',
			fontWeight: 700,
		},
		body1: {
			fontWeight: 300,
			fontFamily: 'Roboto, sans-serif',
		},
		button: {
			fontFamily: 'Roboto',
			fontSize: '1rem',
			textTransform: 'none',
		},
	},
})

export default theme
