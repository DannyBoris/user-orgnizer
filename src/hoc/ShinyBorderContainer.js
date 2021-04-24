import { makeStyles } from '@material-ui/core'
import React from 'react'
import theme from '../theme'
const useStyles = makeStyles(theme => ({
	root: {
		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			right: 0,
			width: 10,
			background: 'inherit',
			height: 10,
			borderRight: `3px solid `,
			borderTop: `3px solid `,
			
		},
		'&::after': {
			content: '""',
			position: 'absolute',
			bottom: 0,
			left: 0,
			width: 10,
			background: 'inherit',
			height: 10,
			borderBottom: `3px solid `,
			borderLeft: `3px solid `,
		},
	},

}))
const ShinyBorderContainer = ({ children, color = theme.palette.secondary.main }) => {
	const classes = useStyles(color)
	return (
		<div className={classes.root} style={{ color }}>
			{children}
		</div>
	)
}

export default ShinyBorderContainer
