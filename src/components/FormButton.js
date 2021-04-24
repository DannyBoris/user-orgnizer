import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import Loader from 'react-loader-spinner'
import CutBorderContainer from '../hoc/CutBorderContainer'
import theme from '../theme'

const useStyles = makeStyles(theme => ({
	btn: {
		fontFamily: 'Roboto',
		width: '50%',
		alignSelf: 'center',
		'&:hover': {
			background: theme.palette.secondary.main,
			transform: 'scale(1.05)',
			transition: 'transform .4s ease',
		},
	},
}))

const FormButton = ({ loading, text }) => {
	const classes = useStyles()

	return (
		<Button type="submit" className={classes.btn} variant="contained" color="secondary">
			<CutBorderContainer color={theme.palette.secondary.main} background={theme.palette.primary.main}>
				<span>{text}</span>
			</CutBorderContainer>
		</Button>
	)
}

export default FormButton
