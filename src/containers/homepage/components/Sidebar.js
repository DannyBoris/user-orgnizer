import { IconButton, makeStyles, useMediaQuery } from '@material-ui/core'
import { ReactComponent as LogoutIcon } from '../../../assets/LogoutIcon.svg'
import { ReactComponent as ProfileIcon } from '../../../assets/ProfileIcon.svg'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import React from 'react'
import theme from '../../../theme'
const useStyles = makeStyles(theme => ({
	root: {
		[theme.breakpoints.down('sm')]: {
			width: 42,
			height: 'calc(100vh -  52.75px)', // header height
			transition: '.5s ease',
			left: open => (open ? 0 : -42), // hide to left
		},
		width: 67.42,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'fixed',
		height: 'calc(100vh - 78.75px)', // header height
		background: 'rgba(15, 15, 15, 1)',
		boxShadow: theme.shadows[6],
		padding: theme.spacing(2.25, 0),
	},
	profile: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: theme.palette.secondary.light,
		width: '100%',
		height: 66,
		borderLeft: `2px solid ${theme.palette.secondary.main}`,
	},
	circle: {
		[theme.breakpoints.down('sm')]: {
			marginRight: (open)=>open ? '-100%' : '-160%',
			transition: '.4s ease',
		},
		width: 25,
		height: 25,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '100%',
		marginRight: '-100%',
		marginTop: theme.spacing(1.5),
		marginBottom: theme.spacing(7.25),
		background: 'rgba(81, 82, 84, 1)',
		boxShadow: theme.shadows[6],
	},
	logoutBtn: {
		position: 'absolute',
		padding: theme.spacing(1.75, 0.5),
		bottom: 0,
		borderTop: `1px solid ${theme.palette.divider}`,
		borderRadius: 0,
	},
}))
const Sidebar = ({ handleLogout, open, setOpen }) => {
	const classes = useStyles(open)
	const matches = useMediaQuery(theme.breakpoints.down('sm'))
	return (
		<div>
			<div style={{ width: '100%' }}></div>
			<aside className={classes.root}>
				<div onClick={matches ? () => setOpen(!open) : null} className={classes.circle}>
					<ArrowForwardIosIcon fontSize="small" htmlColor={theme.palette.secondary.main} />
				</div>
				<div className={classes.profile}>
					<ProfileIcon />
				</div>
				<IconButton onClick={handleLogout} className={classes.logoutBtn}>
					<LogoutIcon />
				</IconButton>
			</aside>
		</div>
	)
}

export default Sidebar
