import React, { useState } from 'react'
import { Avatar, Button, Container, Divider, IconButton, makeStyles, Popover, Typography } from '@material-ui/core'
import { ReactComponent as EmailIcon } from '../../../assets/EmailIcon.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/DeleteIcon.svg'
import theme from '../../../theme'
import ShinyBorderContainer from '../../../hoc/ShinyBorderContainer'
import CutBorderContainer from '../../../hoc/CutBorderContainer'
import Moment from 'react-moment'

const useStyles = makeStyles(theme => ({
	root: {
		[theme.breakpoints.down('sm')]: {
			margin: theme.spacing(2, 3.25),
		},
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		width: 277,
		height: 367,
		textAlign: 'left',
		background: theme.palette.primary.main,
		padding: theme.spacing(2.75, 2.25),
		margin: theme.spacing(6, 3.25),
	},
	avatar: {
		width: 75,
		height: 75,
		marginBottom: theme.spacing(2.28),
	},
	personalInfoContainer: {
		padding: theme.spacing(3.125, 0),
		'& > p:nth-child(2)': {
			margin: theme.spacing(2, 0),
		},
	},
	footer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		'& > div': {
			display: 'flex',
			alignItems: 'center',
			//email icon
			'& > svg': {
				marginRight: theme.spacing(1),
			},
		},
		'& > p': {
			marginLeft: theme.spacing(0.25),
			textDecoration: 'underline',
		},
	},
	delPopup: {
		padding: 20,

		'&> p': {
			flex: '100%',
			textAlign: 'center',
			color: theme.palette.error.main,
			fontWeight: 700,
			marginBottom: theme.spacing(2),
		},
	},
	popBtnContainer: {
		display: 'flex',
		justifyContent: 'space-around',
	},
}))

const UserCard = ({ user, handleDelete, currentUser }) => {
	const { FirstName, LastName, Role, Email, ID, Address, BirthDate, Photo, ownerId, objectId } = user
	const classes = useStyles(currentUser.user === ownerId)
	const [anchorEl, setAnchorEl] = useState(null)

	return (
		<div className={classes.root}>
			<CutBorderContainer>
				<Avatar src={Photo} className={classes.avatar} />
				<Divider />
				<Typography variant="h3">
					{FirstName} {LastName}
				</Typography>
				<Typography variant="body1">{Role.replace('SPACE', ' ')}</Typography>
				<Divider />
				<Container disableGutters className={classes.personalInfoContainer}>
					<Typography variant="body1">ID: {ID}</Typography>

					<Typography variant="body1">
						Birthday: <Moment format="DD/M/y">{BirthDate}</Moment>
					</Typography>

					<Typography variant="body1">Address: {Address}</Typography>
				</Container>
				<Divider />
				<footer className={classes.footer}>
					<div>
						<EmailIcon />
						<Typography variant="body1">{Email}</Typography>
					</div>
					<IconButton onClick={e => setAnchorEl(e.target)}>
						<DeleteIcon />
					</IconButton>
					<Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
						<ShinyBorderContainer color={theme.palette.error.main}>
							<div className={classes.delPopup}>
								<Typography variant="body1">Are you sure you want to delete {FirstName}</Typography>
								<Container className={classes.popBtnContainer}>
									<Button className={classes.popupBtn} variant="contained" onClick={() => handleDelete(objectId)}>
										Yes
									</Button>
									<Button className={classes.popupBtn} variant="contained" onClick={() => setAnchorEl(null)}>
										Cancel
									</Button>
								</Container>
							</div>
						</ShinyBorderContainer>
					</Popover>
				</footer>
			</CutBorderContainer>
		</div>
	)
}

export default UserCard
