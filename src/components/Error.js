import { makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'

const useStyles = makeStyles(theme => ({
	root: {
		color: 'white',
		visibility: ({ error }) => !error && 'hidden',
		background: 'rgba(160,64,64)',
		borderRadius: 8,
		padding: 10,
		fontWeight: 700,
		fontSize: 15,
		maxWidth: '300px',
	},
}))

const Error = ({ error, closeError }) => {
	const classes = useStyles({ error })
	useEffect(() => {
		let t = setTimeout(() => {
			closeError()
		}, 2000)
		return () => {
			clearTimeout(t)
		}
	}, [error])
	return <span className={classes.root}>{error || 'placeholder'}</span>
}

export default Error
