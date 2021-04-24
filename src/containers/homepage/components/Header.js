import { makeStyles, useMediaQuery } from '@material-ui/core'
import { ReactComponent as UserCloudLogo } from '../../../assets/UserCloudLogo.svg'
import React from 'react'
import theme from '../../../theme'

const useStyles = makeStyles(theme => ({
	root: () => ({
		[theme.breakpoints.down('sm')]: {
			height: 52.75,
			transition: '.2s ease',
		},
		display: 'flex',
		top: 0,
		position: 'fixed',
		width: '100%',
		alignItems: 'center',
		zIndex: 1,
		height: 78.75,
		background: theme.palette.secondary.dark,
		boxShadow: theme.shadows[4],
	}),
	innerShape: {
		background: theme.palette.primary.main,
		height: '100%',
		width: '81.5%',
		clipPath: 'polygon(0 0, 100% 0%, 97% 100%, 3% 100%)',
	},
	phantomEl: {},
}))
const Header = () => {
	const matches = useMediaQuery(theme.breakpoints.down('sm'))
	const headerHeight = matches ? 52.75 : 78.75
	const classes = useStyles({ headerHeight })
	return (
		<div>
			<div style={{ height: headerHeight }}></div> {/* phontom element */}
			<header className={classes.root}>
				<UserCloudLogo />
				<div className={classes.innerShape}></div>
			</header>
		</div>
	)
}

export default Header
