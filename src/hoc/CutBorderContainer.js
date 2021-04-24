import { makeStyles } from '@material-ui/core'
import React from 'react'
import theme from '../theme'

const useStyles = makeStyles(theme => ({
	root: ({ color, background }) => ({
		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			left: 0,
			borderTop: `15px solid  ${background}`,
			borderRight: `15px solid ${color}`,
			width: 0,
		},
		'&::after': {
			content: '""',
			position: 'absolute',
			bottom: 0,
			right: 0,
			borderBottom: `15px solid  ${background}`,
			borderLeft: `15px solid ${color}`,
			width: 0,
		},
	}),
}))
const CutBorderContainer = ({
	children,
	background = theme.palette.background.default,
	color = theme.palette.primary.main,
}) => {
	const classes = useStyles({ background, color })
	return <div className={classes.root}>{children}</div>
}

export default CutBorderContainer
